import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

export const getMeHandler = catchAsync(async (req: Request, res: Response) => {
  const user = res.locals.user;

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
