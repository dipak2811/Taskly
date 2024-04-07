import { Request, Response } from "express";
import * as listService from "../services/list.service";
import catchAsync from "../utils/catchAsync";

export const createList = catchAsync(async (req: Request, res: Response) => {
  const { name, path, folderId } = req.body;
  const user = res.locals.user;
  const list = await listService.createListService(
    name,
    path,
    folderId,
    user.id
  );
  res.status(201).json(list);
});

export const editList = catchAsync(async (req: Request, res: Response) => {
  const { listId: id } = req.params;
  const { name, path, folderId } = req.body;

  const updatedList = await listService.editListService(
    id,
    name,
    path,
    folderId
  );
  res.status(200).json(updatedList);
});

export const getAllLists = catchAsync(async (req: Request, res: Response) => {
  const { folderId } = req.params;
  const { page = 1, pageSize = 10, sortBy = "created_at" } = req.query;

  const paginationOptions = {
    page: parseInt(page as string),
    pageSize: parseInt(pageSize as string),
    sortBy: sortBy as string,
  };

  const lists = await listService.getAllListService(
    folderId,
    paginationOptions.page,
    paginationOptions.pageSize,
    paginationOptions.sortBy
  );
  res.status(200).json(lists);
});

export const deleteList = catchAsync(async (req: Request, res: Response) => {
  const { listId } = req.params;
  await listService.deleteListService(listId);
  res.status(200).json({ message: "List deleted successfully" });
});
