import { Request, Response } from "express";
import * as taskService from "../services/task.service";
import catchAsync from "../utils/catchAsync";

export const createTask = catchAsync(async (req: Request, res: Response) => {
  const reqBody = req.body;
  reqBody.reporterId = res.locals.user.id;

  const board = await taskService.create(reqBody);
  res.status(201).json(board);
});

export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { taskId: id } = req.params;
  const { taskData, listId } = req.body;
  const { name, description, label, dueDate, priority, assignees, status } =
    taskData;

  const updatedTask = await taskService.updateTaskService(
    id,
    listId,
    name,
    description,
    label,
    dueDate,
    priority,
    assignees,
    status
  );

  res.status(200).json(updatedTask);
});

export const getAllTasks = catchAsync(async (req: Request, res: Response) => {
  const { listId } = req.params;
  const { page = 1, pageSize = 10, sortBy = "created_at" } = req.query;

  const paginationOptions = {
    page: parseInt(page as string),
    pageSize: parseInt(pageSize as string),
    sortBy: sortBy as string,
  };

  const tasks = await taskService.getAllTasksService(
    listId,
    paginationOptions.page,
    paginationOptions.pageSize,
    paginationOptions.sortBy
  );
  res.status(200).json(tasks);
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { listId } = req.body;
  const board = await taskService.deleteTaskService(taskId, listId);
  res.status(200).json(board);
});
