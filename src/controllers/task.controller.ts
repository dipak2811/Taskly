import { Request, Response } from "express";
import * as taskService from "../services/task.service";
import catchAsync from "../utils/catchAsync";

export const createTask = catchAsync(async (req: Request, res: Response) => {
  const reqBody = req.body;
  reqBody.reporterId = res.locals.user.id;

  const list = await taskService.create(reqBody);
  res.status(201).json(list);
});

export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { taskId: id } = req.params;
  const { name, description, label, dueDate, priority, assignees } = req.body;

  const updatedTask = await taskService.updateTaskService(
    id,
    name,
    description,
    label,
    dueDate,
    priority,
    assignees
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
  await taskService.deleteTaskService(taskId);
  res.status(200).json({ message: "Task deleted successfully" });
});
