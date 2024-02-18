import { NextFunction, Request, Response } from "express";
import { createFolder, getAllFolders } from "../services/project.service";

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, path } = req.body;
    const project = await createFolder(name, path,res.locals.user.id);
    res.status(201).json(project);
  } catch (error: any) {
    next(error);
  }
};
export const getAllProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
        const projects = await getAllFolders(res.locals.user.id);
        res.status(200).json(projects);
};
