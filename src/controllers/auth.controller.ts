import { Request, Response, CookieOptions } from "express";
import config from "config";
import crypto from "crypto";
import { CreateUserInput, LoginUserInput } from "../schemas/user.schema";
import * as userService from "../services/user.service";
import AppError from "../utils/appError";
import redisClient from "../utils/connectRedis";
import { signJwt, verifyJwt } from "../utils/jwt";
import { User } from "../entities/user.entity";
import Email from "../utils/email";
import catchAsync from "../utils/catchAsync";

const cookiesOptions: CookieOptions & { secure?: boolean } = {
  httpOnly: true,
  sameSite: "lax",
};

if (process.env.NODE_ENV === "production") cookiesOptions.secure = true;
const accessTokenCookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>("accessTokenExpiresIn") * 60 * 1000
  ),
  maxAge: config.get<number>("accessTokenExpiresIn") * 60 * 1000,
};

const refreshTokenCookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>("refreshTokenExpiresIn") * 60 * 1000
  ),
  maxAge: config.get<number>("refreshTokenExpiresIn") * 60 * 1000,
};

export const registerUserHandler = catchAsync(
  async (req: Request<{}, {}, CreateUserInput>, res: Response) => {
    const { name, password, email, role } = req.body;

    const newUser = await userService.createUser({
      name,
      email: email.toLowerCase(),
      password,
      role,
    });

    const { hashedVerificationCode, verificationCode } =
      User.createVerificationCode();
    newUser.verificationCode = hashedVerificationCode;
    await newUser.save();

    // Send Verification Email
    const redirectUrl = `${config.get<string>(
      "origin"
    )}/verifyemail/${verificationCode}`;

    await new Email(newUser, redirectUrl).sendVerificationCode();

    res.status(201).json({
      status: "success",
      message: "An email with a verification code has been sent to your email",
    });
  }
);

export const loginUserHandler = catchAsync(
  async (req: Request<{}, {}, LoginUserInput>, res: Response) => {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail({ email });

    if (!user) {
      throw new AppError(400, "Invalid email or password");
    }

    if (!user.verified) {
      throw new AppError(
        401,
        "You are not verified, check your email to verify your account"
      );
    }

    if (!(await User.comparePasswords(password, user.password))) {
      throw new AppError(400, "Invalid email or password");
    }

    const { access_token, refresh_token } = await userService.signTokens(user);

    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: "success",
      access_token,
      user,
    });
  }
);

export const verifyEmailHandler = catchAsync(
  async (req: Request, res: Response) => {
    const verificationCode = crypto
      .createHash("sha256")
      .update(req.params.verificationCode)
      .digest("hex");

    const user = await userService.findUser({ verificationCode });

    if (!user) {
      throw new AppError(401, "Could not verify email");
    }

    user.verified = true;
    user.verificationCode = null;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Email verified successfully",
    });
  }
);

export const refreshAccessTokenHandler = catchAsync(
  async (req: Request, res: Response) => {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) {
      throw new AppError(403, "Could not refresh access token");
    }

    const decoded = verifyJwt<{ sub: string }>(
      refresh_token,
      "refreshTokenPublicKey"
    );

    if (!decoded) {
      throw new AppError(403, "Could not refresh access token");
    }

    const session = await redisClient.get(decoded.sub);

    if (!session) {
      throw new AppError(403, "Could not refresh access token");
    }

    const user = await userService.findUserById(JSON.parse(session).id);

    if (!user) {
      throw new AppError(403, "Could not refresh access token");
    }

    const access_token = signJwt({ sub: user.id }, "accessTokenPrivateKey", {
      expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
    });

    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: "success",
      access_token,
    });
  }
);

const logout = (res: Response) => {
  res.cookie("access_token", "", { maxAge: 1 });
  res.cookie("refresh_token", "", { maxAge: 1 });
  res.cookie("logged_in", "", { maxAge: 1 });
};

export const logoutHandler = catchAsync(async (req: Request, res: Response) => {
  const user = res.locals.user;

  await redisClient.del(user.id);
  logout(res);

  res.status(200).json({
    status: "success",
  });
});
