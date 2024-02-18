import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import Model from './model.entity';
import { Folder } from './folder.entity';
import { Task } from './task.entity';

@Entity("lists")

export class List extends Model {
  @Column()
  name: string;

  @Column()
  path: string;

  @ManyToOne(()=> Folder, folder => folder.id)
  folder: Folder;

  @OneToMany(()=>Task, task => task.id)
  tasks: Task[];
}
