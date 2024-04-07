import { Kanban } from "../entities/kanban.entity";
import { Task } from "../entities/task.entity";
import { AppDataSource } from "../utils/data-source";

const kanbanRepository = AppDataSource.getRepository(Kanban);
const taskRepository = AppDataSource.getRepository(Task);

const getTaskColumn = (status: string) => {
  switch (status) {
    case "todo":
      return "To Do";
    case "inProgress":
      return "In Progress";
    case "testing":
      return "Testing";
    case "complete":
      return "Complete";
    case "onHold":
      return "On Hold";
    case "canceled":
      return "Canceled";
    case "reopened":
      return "Reopened";
    default:
      return "To Do";
  }
};

export const getKanbanBoard = async (listId: string) => {
  const kanbanBoard = await kanbanRepository.findOne({
    where: { list: { id: listId } },
    relations: ["columns"],
  });
  if (!kanbanBoard) {
    throw new Error("Kanban board not found");
  }

  const tasks = await taskRepository.find({
    where: { list: { id: listId } },
    relations: ["assignees"],
  });

  const columnsResponse: any = {};
  kanbanBoard.columns.forEach((column) => {
    columnsResponse[`${column.id}`] = {
      id: `${column.id}`,
      name: column.name,
      taskIds: tasks
        .filter((task) => getTaskColumn(task.status) === column.name)
        .map((task) => `${task.id}`),
    };
  });

  const tasksResponse: any = {};
  tasks.forEach((task) => {
    tasksResponse[`${task.id}`] = {
      assignee: task.assignees,
      ...task,
    };
  });

  const orderedResponse = kanbanBoard.columns
    .sort((a, b) => a.order - b.order)
    .map((column) => `${column.id}`);

  return {
    board: {
      columns: columnsResponse,
      tasks: tasksResponse,
      ordered: orderedResponse,
    },
  };
};
