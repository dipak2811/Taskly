import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import Model from "./model.entity";
import { User } from "./user.entity";
import { Task } from "./task.entity";

@Entity("comments")
export class Comments extends Model {
  @Column()
  messageType: string;

  @Column()
  message: string;

  @ManyToOne(() => Task, (task) => task.comments)
  @JoinColumn()
  task: Task;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User;
}
