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


export const editFolderService = async (
  id: string,
  name?: string,
  path?: string,
  isShared?: boolean,
  permission?: string,
  users?: User[]
) => {
  const folder = await projectRepository.findOneBy({ id });

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

  return await projectRepository.save(folder);
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
    relations: { users: true,list:true },
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

export const getFolder = async (projectId: string) => {
  const folder = await projectRepository.findOne({
    relations: { users:true,list:true },
    where: { id: projectId },
  });
  
  if (!folder) {
    throw new AppError(404, "Folder not found");
  }
  return folder;
};

export const deleteFolder = async (projectId: string,userId:string) => {
  const folder = await projectRepository.findOne({
    relations: { users: true,list:true },
    where: { id: projectId,isDeleted:false }, 
  });
  if (!folder) {
    throw new AppError(404, "Folder not found");
  }
  folder.users = folder.users.filter((user) => user.id !== userId);
  folder.isDeleted = true;
  folder.deleted_at = new Date();
  folder.list.forEach((list)=> list.isDeleted = true);
  await projectRepository.manager.save(folder);
};
