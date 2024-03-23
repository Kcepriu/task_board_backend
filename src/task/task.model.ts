import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TypePriority } from 'src/types/models.types';
import { TaskList } from 'src/task-list/task-list.model';
import { ChangeHistoryTask } from 'src/change-history-tasks/change-history-tasks.model';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ nullable: false, type: 'bigint', default: Date.now() })
  due_date: number;

  @Column({
    type: 'enum',
    enum: TypePriority,
    default: TypePriority.LOW,
  })
  priority: TypePriority;

  @ManyToOne(() => TaskList, (status: TaskList) => status.tasks, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  status: TaskList;

  @OneToMany(
    () => ChangeHistoryTask,
    (taskHistory: ChangeHistoryTask) => taskHistory.task,
    {
      cascade: ['remove'],
      onDelete: 'SET NULL',
    },
  )
  histories: ChangeHistoryTask[];
}
