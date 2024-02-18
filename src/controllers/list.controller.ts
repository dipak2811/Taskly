import { NextFunction, Request, Response } from "express";
import { createListService, getAllListService } from "../services/list.service";

export const createList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, path,folderId } = req.body;
    const list = await createListService(name, path, folderId);
    res.status(201).json(list);
  } catch (error: any) {
    next(error);
  }
};
export const getAllLists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const { folderId } = req.params;
  const lists = await getAllListService(folderId);
  res.status(200).json(lists);
};
