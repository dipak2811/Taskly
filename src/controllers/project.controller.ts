import { Request, Response } from "express";
import * as projectService from "../services/project.service";
import catchAsync from "../utils/catchAsync"; // Assuming you have a catchAsync utility function

export const createProject = catchAsync(async (req: Request, res: Response) => {
  const { name, path } = req.body;
  const project = await projectService.createFolder(
    name,
    path,
    res.locals.user.id
  );
  res.status(201).json(project);
});

export const getAllProjects = catchAsync(
  async (req: Request, res: Response) => {
    const projects = await projectService.getAllFolders(res.locals.user.id);
    res.status(200).json(projects);
  }
);
