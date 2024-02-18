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
export const getAllFolders = async (userId: string) => {
  const user = await projectRepository.find({
    relations: ["users"],
    where: { users: { id: userId } },
  });
  return user;
};
