import { TaskLable, TaskPriority, TaskStatus } from "../entities/task.entity";

export interface Assignee {
    id: string; // Assuming the ID of the assignee is a string
    // Add other properties of the assignee if needed
}

export interface List {
    id: string; // Assuming the ID of the list is a string
    // Add other properties of the list if needed
}

export interface Comment {
    commentTitle: string;
    commentTime: Date;
    commentAttachment: string[];
    commentCreator: string;
    // Add other properties of the comment if needed
}

export interface ITask {
    name: string;
    description: string;
    status: TaskStatus; // Assuming TaskStatus is an enum
    label: TaskLable; // Assuming TaskLable is an enum
    reporterId: string; // Assuming the ID of the reporter is a string
    dueDate: Date;
    priority: TaskPriority; // Assuming TaskPriority is an enum
    attachment: string[];
    comments: Comment[];
    list: List;
    assignees: Assignee[];
}
