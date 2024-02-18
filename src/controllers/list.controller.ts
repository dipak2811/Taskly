import { Request, Response } from "express";
import * as listServer from "../services/list.service";
import catchAsync from "../utils/catchAsync";

export const createList = catchAsync(async (req: Request, res: Response) => {
  const { name, path, folderId } = req.body;
  const list = await listServer.createListService(name, path, folderId);
  res.status(201).json(list);
});

export const getAllLists = catchAsync(async (req: Request, res: Response) => {
  const { folderId } = req.params;
  const lists = await listServer.getAllListService(folderId);
  res.status(200).json(lists);
});
