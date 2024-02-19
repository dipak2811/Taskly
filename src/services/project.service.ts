import { FindManyOptions } from "typeorm";
import AppError from "../utils/appError";
import { User } from "../entities/user.entity";
import { Folder } from "../entities/folder.entity";
import { AppDataSource } from "../utils/data-source";

const projectRepository = AppDataSource.getRepository(Folder);

export const createFolder = async (
  name: string,
  path: string,
  creatorId: string
) => {
  return await projectRepository.save(
    projectRepository.create({
      name,
      path,
      creatorId,
      users: [{ id: creatorId }],
    })
  );
};

const folderRepository = AppDataSource.getRepository(Folder);

export const editFolderService = async (
  id: string,
  name?: string,
  path?: string,
  isShared?: boolean,
  permission?: string,
  users?: User[]
) => {
  const folder = await folderRepository.findOneBy({ id });

  if (!folder) {
    throw new AppError(404, "Folder not found");
  }

  if (name !== undefined) {
    folder.name = name;
  }
  if (path !== undefined) {
    folder.path = path;
  }
  if (isShared !== undefined) {
    folder.isShared = isShared;
  }
  if (permission !== undefined) {
    folder.permission = permission;
  }
  if (users !== undefined) {
    folder.users = users;
  }

  return await folderRepository.save(folder);
};

export const getAllFolders = async (
  userId: string,
  page: number,
  pageSize: number,
  sortBy: string
): Promise<{
  pageNo: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalDocs: number;
  folders: any[];
}> => {
  const options: FindManyOptions = {
    relations: ["users"],
    where: { users: { id: userId } },
    skip: (page - 1) * pageSize,
    take: pageSize,
    order: { [sortBy]: "DESC" },
  };

  const [folders, totalDocs] = await projectRepository.findAndCount(options);
  const totalPages = Math.ceil(totalDocs / pageSize);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    pageNo: page,
    totalPages: totalPages,
    hasNextPage: hasNextPage,
    hasPrevPage: hasPrevPage,
    totalDocs: totalDocs,
    folders: folders,
  };
};
