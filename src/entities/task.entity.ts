import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Model from "./model.entity";
import { List } from "./list.entity";
import { User } from "./user.entity";

export enum TaskStatus {
  TODO = "todo",
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
}

export enum TaskLable {
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

  @Column({ type: "enum", enum: TaskLable })
  label: TaskLable;

  @Column()
  reporterId: string;

  @Column()
  dueDate: Date;

  @Column({ type: "enum", enum: TaskPriority, default: TaskPriority.MAJOR })
  priority: TaskPriority;

  @Column("simple-array")
  attachment: string[];

  @Column({ type: "jsonb", nullable: true })
  comments: Comment[];

  @ManyToOne(() => List, (list) => list.id)
  list: List;

  @ManyToMany(() => User)
  @JoinTable()
  assignees: User[];
}
