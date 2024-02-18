import { List } from "../entities/list.entity";
import { AppDataSource } from "../utils/data-source";

const projectRepository = AppDataSource.getRepository(List);

export const createListService= async (
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
export const getAllListService = async (folderId: string) => {
  const list = await projectRepository.find({
    relations: ["folder"],
    where: { folder: { id: folderId } },
  });
  return list;
};
