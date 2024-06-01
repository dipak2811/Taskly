import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import Model from "./model.entity";
import { List } from "./list.entity";
import { User } from "./user.entity";

export enum TaskStatus {
  TODO = "toDo",
  INPROGRESS = "inProgress",
  TESTING = "testing",
  COMPLETE = "complete",
  ONHOLD = "onHold",
  CANCELED = "canceled",
  REOPENED = "reopened",
}

export enum TaskPriority {
  BLOCKER = "blocker",
  CRITICAL = "critical",
  MAJOR = "major",
  MINOR = "minor",
  TRIVIAL = "trivial",
  MEDIUM = "medium",
}

export enum TaskLabel {
  FRONTEND = "frontend",
  BACKEND = "backend",
  DATABASE = "database",
  DEVOPS = "devops",
  TESTING = "testing",
  DESIGN = "design",
  DOCUMENTATION = "documentation",
  RESEARCH = "research",
  OTHER = "other",
}
interface Comment {
  commentTitle: string;
  commentTime: Date;
  commentAttachment: string[];
  commentCreator: string;
}

@Entity("task")
export class Task extends Model {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @Column({ array: true, type: "enum", enum: TaskLabel, default: [] })
  label: TaskLabel;

  @Column()
  reporterId: string;

  @Column({ array: true, type: "timestamp", default: [] })
  dueDate: string[];

  @Column({ type: "enum", enum: TaskPriority, default: TaskPriority.MAJOR })
  priority: TaskPriority;

  @Column("simple-array", { nullable: true })
  attachment: string[];

  @Column({ type: "jsonb", nullable: true })
  comments: Comment[];

  @ManyToOne(() => List, (list) => list.tasks) // Assuming your column is named list_id
  list: List;

  @ManyToMany(() => User)
  @JoinTable()
  assignees: User[];
}
