import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TypePriority } from 'src/types/models.types';

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
}

//status
