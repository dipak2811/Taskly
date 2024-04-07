import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from "typeorm";
import Model from "./model.entity";
import { User } from "./user.entity";
import { List } from "./list.entity";
import { Columns } from "./columns.entity";

@Entity("kanban_board")
export class Kanban extends Model {
  @Column()
  name: string;

  @Column()
  creatorId: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @OneToMany(() => Columns, (column) => column.kanban)
  columns: Columns[];

  @OneToOne(() => List)
  @JoinColumn({ name: "id" })
  list: List;
}
