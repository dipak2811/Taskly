import { FindManyOptions } from "typeorm";
import { List } from "../entities/list.entity";
import { AppDataSource } from "../utils/data-source";

const projectRepository = AppDataSource.getRepository(List);

export const createListService = async (
  name: string,
  path: string,
  folderId: string
) => {
  return await projectRepository.save(
    projectRepository.create({
      name,
      path,
      folder: { id: folderId },
    })
  );
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
