import { FindManyOptions } from "typeorm";
import { List } from "../entities/list.entity";
import { AppDataSource } from "../utils/data-source";
import { Folder } from "../entities/folder.entity";
import AppError from "../utils/appError";
import { Kanban } from "../entities/kanban.entity";
import { Columns } from "../entities/columns.entity";

const projectRepository = AppDataSource.getRepository(List);
const folderRepository = AppDataSource.getRepository(Folder);
const kanbanRepository = AppDataSource.getRepository(Kanban);
const columnsRepository = AppDataSource.getRepository(Columns);

export const createListService = async (
  name: string,
  path: string,
  folderId: string,
  creatorId: string
) => {
  const list = await projectRepository.save(
    projectRepository.create({
      name,
      path,
      folder: { id: folderId },
    })
  );

  const kanban = kanbanRepository.create({
    creatorId: creatorId, // Provide the creator's ID
    name: name, // Provide a name for the Kanban board
    users: [], // Optionally provide users
    list: list, // Provide the list
  });

  await kanbanRepository.save(kanban);

  const defaultColumns = [
    { name: "To Do", order: 1 },
    { name: "In Progress", order: 2 },
    { name: "On Hold", order: 3 },
    { name: "Complete", order: 4 },
  ]; // Define your default column names and orders

  const columns = defaultColumns.map(({ name, order }) => {
    const column = new Columns();
    column.name = name;
    column.order = order;
    column.kanban = kanban;
    return column;
  });

  // Save default columns
  await columnsRepository.save(columns);

  return list;
};

export const editListService = async (
  id: string,
  name?: string,
  path?: string,
  folderId?: string
) => {
  const list = await projectRepository.findOneBy({ id });

  if (!list) {
    throw new AppError(404, "List not found");
  }

  if (name) {
    list.name = name;
  }
  if (path) {
    list.path = path;
  }
  if (folderId) {
    const folder = await folderRepository.findOneBy({ id: folderId });

    if (!folder) {
      throw new AppError(404, "Folder not found");
    }

    list.folder = folder;
  }

  return await projectRepository.save(list);
};

export const getAllListService = async (
  folderId: string,
  page: number,
  pageSize: number,
  sortBy: string
): Promise<{
  pageNo: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalDocs: number;
  lists: any[];
}> => {
  const options: FindManyOptions = {
    relations: ["folder"],
    where: { folder: { id: folderId } },
    skip: (page - 1) * pageSize,
    take: pageSize,
    order: { [sortBy]: "DESC" },
  };

  const [lists, totalDocs] = await projectRepository.findAndCount(options);
  const totalPages = Math.ceil(totalDocs / pageSize);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    pageNo: page,
    totalPages: totalPages,
    hasNextPage: hasNextPage,
    hasPrevPage: hasPrevPage,
    totalDocs: totalDocs,
    lists: lists,
  };
};

export const deleteListService = async (listId: string) => {
  const list = await projectRepository.findOneBy({ id: listId });

  if (!list) {
    throw new AppError(404, "List not found");
  }

  await projectRepository.remove(list);
};
