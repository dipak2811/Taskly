import { FindManyOptions } from "typeorm";
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
