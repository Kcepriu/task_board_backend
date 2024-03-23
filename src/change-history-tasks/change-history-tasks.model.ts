import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TypeOperation } from 'src/types/models.types';

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
}
