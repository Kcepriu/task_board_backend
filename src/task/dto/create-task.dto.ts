import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { TypePriority } from 'src/types/models.types';
import { TaskList } from 'src/task-list/task-list.model';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly due_date: number;

  @IsEnum(TypePriority)
  @IsNotEmpty()
  readonly priority: TypePriority;

  @IsNotEmpty()
  readonly status: TaskList;
}
