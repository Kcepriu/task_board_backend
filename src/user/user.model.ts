import { Task } from 'src/task/task.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: '' })
  token: string;

  // @OneToMany(() => Task, (task: Task) => task.user, {
  //   cascade: ['remove'],
  // })
  // tasks: Task[];
}
