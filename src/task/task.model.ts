import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TypePriority } from 'src/types/models.types';
import { TaskList } from 'src/task-list/task-list.model';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ nullable: false })
  due_date: number;

  @Column({
    type: 'enum',
    enum: TypePriority,
    default: TypePriority.LOW,
  })
  priority: TypePriority;

  @ManyToOne(() => TaskList, (status: TaskList) => status.tasks, {
    nullable: false,
  })
  status: TaskList;
}
