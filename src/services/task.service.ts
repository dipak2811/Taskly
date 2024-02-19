import { FindManyOptions } from "typeorm";
import { Task } from "../entities/task.entity";
import { ITask } from "../interfaces/task.interface";
import { AppDataSource } from "../utils/data-source";

const projectRepository = AppDataSource.getRepository(Task);

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

  const newAssignees = assignees.map((assignee) => ({ id: assignee.id }));

  return await projectRepository.save(
    projectRepository.create({
      name,
      description,
      status,
      label,
      reporterId,
      dueDate,
      priority,
      attachment,
      comments,
      list: { id: list.id },
      assignees: newAssignees,
    })
  );
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
    relations: ["list"],
    where: { list: { id: listId } },
    skip: (page - 1) * pageSize,
    take: pageSize,
    order: { [sortBy]: "DESC" },
  };

  const [tasks, totalTasksCount] = await projectRepository.findAndCount(
    options
  );

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
