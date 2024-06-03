import { Task } from "../entities/task.entity";
import { AppDataSource } from "../utils/data-source";
import { firestore, storage } from "../utils/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getKanbanBoard } from "./kanban.service";
import { v4 as uuidv4 } from "uuid"; //
import { addDoc, collection } from "firebase/firestore";

const taskRepository = AppDataSource.getRepository(Task);

export const uploadAndSaveFiles = async (
  files: any[],
  taskId: string,
  listId: string
) => {
  const task = await taskRepository.findOneBy({ id: taskId });
  if (!task) {
    throw new Error(`Task with ID ${taskId} not found`);
  }

  // Upload files to Firebase Storage and save metadata in Firestore
  const fileUploadPromises = files.map(async (file) => {
    try {
      const uniqueFileName = `${uuidv4()}-${file.originalname}`;
      const storageRef = ref(storage, uniqueFileName);

      // Upload the file buffer to Firebase Storage
      await uploadBytes(storageRef, file.buffer, {
        contentType: file.mimetype,
      });

      // Get the download URL of the uploaded file
      const url = await getDownloadURL(storageRef);

      // Save file metadata to Firestore
      const fileMetadata = {
        name: file.originalname,
        url: url,
        taskId: taskId,
        uploadedAt: new Date().toISOString(),
      };

      await addDoc(collection(firestore, "files"), fileMetadata);

      return url;
    } catch (error) {
      console.error("Error uploading file:", file.originalname, error);
      throw error; // Re-throw the error to be caught by the outer promise
    }
  });

  try {
    const fileUrls = await Promise.all(fileUploadPromises);
    console.log("Uploaded files:", fileUrls);
    // Save file URLs in the task
    if (!task.attachment) {
      task.attachment = fileUrls;
    } else {
      task.attachment = [...task.attachment, ...fileUrls];
    }
    await taskRepository.save(task);
    const board = await getKanbanBoard(listId);
    return board;
  } catch (error) {
    console.error("Error uploading files:", error);
    throw new Error("An error occurred while uploading files.");
  }
};
