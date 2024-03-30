import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { TypePriority } from 'src/types/models.types';
import { TaskList } from 'src/task-list/task-list.model';
import { IsTaskListExist } from '../isTaskListExist.validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly due_date: number;

  @IsEnum(TypePriority)
  @IsNotEmpty()
  readonly priority: TypePriority;

  @IsNotEmpty()
  @IsTaskListExist()
  readonly status: TaskList;
}
