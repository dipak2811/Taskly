import { deleteFiles, uploadAndSaveFiles } from "../services/upload.service";
import { Request, Response } from "express";

export const uploadFile = async (req: Request, res: Response) => {
  const files = req.files;
  const { taskId, listId } = req.body;

  if (!files) {
    return res.status(400).json({
      status: "error",
      message: "No files uploaded",
    });
  }

  const board = await uploadAndSaveFiles(files, taskId, listId);

  res.status(200).json(board);
};

export const deleteFile = async (req: Request, res: Response) => {
  const { listId, fileUrls, taskId } = req.body;
  const board = await deleteFiles(fileUrls, listId, taskId);
  res.status(200).json(board);
};
