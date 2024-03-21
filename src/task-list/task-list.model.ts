import { Task } from 'src/task/task.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class TaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Task, (task: Task) => task.status, {
    cascade: true,
    eager: true,
  })
  tasks: Task[];
}
