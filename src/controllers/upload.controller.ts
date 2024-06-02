import { uploadAndSaveFiles } from "../services/upload.service";
import { Request, Response } from "express";

export const uploadFile = async (req: Request, res: Response) => {
  const { files, taskId, listId } = req.body;

  if (!files) {
    return res.status(400).json({
      status: "error",
      message: "No files uploaded",
    });
  }

  await uploadAndSaveFiles(files, taskId, listId);

  return res.status(200).json({
    status: "success",
    message: "File uploaded successfully",
  });
};
