import { Request, Response } from "express";
import * as KanbanService from "../services/kanban.service";

export const getKanbanBoard = async (req: Request, res: Response) => {
  const { listId } = req.params;
  const kanbanBoard = await KanbanService.getKanbanBoard(listId);
  res.json(kanbanBoard);
};
