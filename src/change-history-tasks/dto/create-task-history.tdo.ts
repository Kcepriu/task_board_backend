import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { TypeOperation } from 'src/types/models.types';
import { Task } from 'src/task/task.model';
import { IsTaskExist } from 'src/task/isTaskExist.validator';
export class CreateTaskHistoryDto {
  @IsNumber()
  readonly due_date: number;

  @IsString()
  @IsNotEmpty()
  readonly nameTask: string;

  @IsEnum(TypeOperation)
  @IsNotEmpty()
  readonly operation: TypeOperation;

  @IsString()
  readonly data_before: string;

  @IsString()
  readonly data_after: string;

  @IsNotEmpty()
  @IsTaskExist()
  readonly task: Task;
}
