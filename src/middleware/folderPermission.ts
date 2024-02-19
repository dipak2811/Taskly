import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { AppDataSource } from "../utils/data-source";
import { Folder } from "../entities/folder.entity";

const projectRepository = AppDataSource.getRepository(Folder);
export const folderPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = res.locals.user;
    if (!currentUser) {
      return next(
        new AppError(400, `Session has expired or user doesn't exist`)
      );
    }

    const user = await projectRepository.findOne({
      relations: ["users"],
      where: { users: { id: currentUser.id } },
    });

    if (!user) {
      return next(new AppError(400, `Permission denied`));
    }

    next();
  } catch (err) {
    next(err);
  }
};
