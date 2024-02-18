import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import Model from "./model.entity";
import { User } from "./user.entity";
import { List } from "./list.entity";

@Entity("project_folders")
export class Folder extends Model {
  @Column()
  name: string;

  @Column()
  creatorId: string;

  @Column({ default: "/" })
  path: string;

  @Column({ default: false })
  isShared: boolean;

  @Column({ default: "write" })
  permission: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @OneToMany(() => List, (list) => list.id)
  list: List[];
}
