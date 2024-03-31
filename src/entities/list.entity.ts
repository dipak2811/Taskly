import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import Model from "./model.entity";
import { Folder } from "./folder.entity";
import { Task } from "./task.entity";

@Entity("lists")
export class List extends Model {
  @Column()
  name: string;

  @Column()
  path: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => Folder, (folder) => folder.id)
  folder: Folder;

  @OneToMany(() => Task, (task) => task.list)
  tasks: Task[];
}
