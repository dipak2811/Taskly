import { Request, Response } from "express";
import * as taskSerivce from "../services/task.service";
import catchAsync from "../utils/catchAsync";

export const createTask = catchAsync(async (req: Request, res: Response) => {
  const reqBody = req.body;
  reqBody.reporterId = res.locals.user.id;

  const list = await taskSerivce.create(reqBody);
  res.status(201).json(list);
});

export const getAllTasks = catchAsync(async (req: Request, res: Response) => {
  const { listId } = req.params;
  const lists = await taskSerivce.getAllTasksService(listId);
  res.status(200).json(lists);
});
