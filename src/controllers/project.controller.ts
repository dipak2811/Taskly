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

export const editFolder = catchAsync(async (req: Request, res: Response) => {
  const { projectId: id } = req.params;
  const { name, path, isShared, permission, users } = req.body;

  const updatedFolder = await projectService.editFolderService(
    id,
    name,
    path,
    isShared,
    permission,
    users
  );

  res.status(200).json(updatedFolder);
});

export const getAllProjects = catchAsync(
  async (req: Request, res: Response) => {
    const { page = 1, pageSize = 10, sortBy = "created_at" } = req.query;

    const paginationOptions = {
      page: parseInt(page as string),
      pageSize: parseInt(pageSize as string),
      sortBy: sortBy as string,
    };

    const projects = await projectService.getAllFolders(
      res.locals.user.id,
      paginationOptions.page,
      paginationOptions.pageSize,
      paginationOptions.sortBy
    );
    res.status(200).json(projects);
  }
);
