import { FindManyOptions } from "typeorm";
import { Task, TaskLabel, TaskPriority } from "../entities/task.entity";
import { ITask } from "../interfaces/task.interface";
import { AppDataSource } from "../utils/data-source";
import AppError from "../utils/appError";
import { User } from "../entities/user.entity";

const taskRepository = AppDataSource.getRepository(Task);

export const create = async (reqBody: ITask) => {
  const {
    name,
    description,
    status,
    label,
    dueDate,
    priority,
    attachment,
    comments,
    list,
    assignees,
    reporterId,
  } = reqBody;
  const newAssignees = assignees?.map((assignee) => ({ id: assignee.id }));

  return await taskRepository.save(
    taskRepository.create({
      name,
      description,
      status,
      label,
      reporterId,
      dueDate: dueDate.map((date: string) => new Date(date).toISOString()),
      priority,
      attachment,
      comments,
      list: { id: list.id },
      assignees: newAssignees,
    })
  );
};

export const updateTaskService = async (
  id: string,
  name?: string,
  description?: string,
  label?: TaskLabel,
  dueDate?: string[],
  priority?: TaskPriority,
  assignees?: User[]
) => {
  const task = await taskRepository.findOneBy({ id });

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  if (name !== undefined) {
    task.name = name;
  }
  if (description !== undefined) {
    task.description = description;
  }
  if (label !== undefined) {
    task.label = label;
  }
  if (dueDate !== undefined) {
    task.dueDate = dueDate?.map((date: string) => new Date(date).toISOString());
  }
  if (priority !== undefined) {
    task.priority = priority;
  }
  if (assignees !== undefined) {
    task.assignees = assignees;
  }

  return await taskRepository.save(task);
};

export const getAllTasksService = async (
  listId: string,
  page: number,
  pageSize: number,
  sortBy: string
): Promise<{
  pageNo: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalDocs: number;
  tasks: any[];
}> => {
  const options: FindManyOptions = {
    relations: ["list", "assignees"],
    where: { list: { id: listId } },
    skip: (page - 1) * pageSize,
    take: pageSize,
    order: { [sortBy]: "DESC" },
  };

  const [tasks, totalTasksCount] = await taskRepository.findAndCount(options);
  console.log(tasks, totalTasksCount);

  const totalDocs = totalTasksCount;
  const totalPages = Math.ceil(totalTasksCount / pageSize);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    pageNo: page,
    totalPages: totalPages,
    hasNextPage: hasNextPage,
    hasPrevPage: hasPrevPage,
    totalDocs: totalDocs,
    tasks: tasks,
  };
};

export const deleteTaskService = async (taskId: string) => {
  const task = await taskRepository.findOneBy({ id: taskId });

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  await taskRepository.remove(task);
};
