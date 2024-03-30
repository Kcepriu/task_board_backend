import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TypeOperation } from 'src/types/models.types';
import { Task } from 'src/task/task.model';
@Entity()
export class ChangeHistoryTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nameTask: string;

  @Column({ nullable: false, type: 'bigint', default: Date.now() })
  due_date: number;

  @Column({
    type: 'enum',
    enum: TypeOperation,
    default: TypeOperation.POST,
  })
  operation: TypeOperation;

  @Column({ default: '' })
  data_before: string;

  @Column({ default: '' })
  data_after: string;

  @ManyToOne(() => Task, (task: Task) => task.histories, {
    nullable: true,
    orphanedRowAction: 'nullify',
    onDelete: 'SET NULL',
  })
  task: Task;
}
