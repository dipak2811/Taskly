import { Task } from "../entities/task.entity";
import { AppDataSource } from "../utils/data-source";

const taskRepository = AppDataSource.getRepository(Task);

export const uploadAndSaveFiles = async (
  files: File[],
  taskId: string,
  listId: string
) => {
  const task = await taskRepository.findOneBy({ id: taskId });

  if (!task) {
    throw new Error("Task not found");
  }

  console.log(files);

  //   const filePromises = files.map(async (file) => {
  //     const fileEntity = new File();
  //     fileEntity.name = file.originalname;
  //     fileEntity.path = file.path;
  //     fileEntity.task = task;
  //     await fileRepository.save(fileEntity);
  //   });

  //   await Promise.all(filePromises);
};
