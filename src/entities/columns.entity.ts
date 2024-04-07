import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Kanban } from "./kanban.entity";

@Entity("columns")
export class Columns extends Model {
  @Column()
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => Kanban, (kanban) => kanban.columns)
  @JoinColumn()
  kanban: Kanban;
}
