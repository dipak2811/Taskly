import { Task } from "../entities/task.entity";
import { ITask } from "../interfaces/task.interface";
import { AppDataSource } from "../utils/data-source";

const projectRepository = AppDataSource.getRepository(Task);

export const create = async (reqBody:ITask) => {
    const { name, description, status, label,  dueDate, priority, attachment, comments, list, assignees,reporterId } = reqBody;
    
    const newAssignees = assignees.map(assignee => ({ id: assignee.id }));

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
            assignees: newAssignees
        })
    );
};



export const getAllTasksService = async (listId: string) => {
  const list = await projectRepository.find({
    relations: ["list"],
    where: { list: { id: listId } },
  });
  return list;
};
