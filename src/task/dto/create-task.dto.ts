import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { TypePriority } from 'src/types/models.types';
import { TaskList } from 'src/task-list/task-list.model';
import { IsTaskListExist } from '../isTaskListExist.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  readonly due_date: number;

  @ApiProperty({
    enum: ['low', 'medium', 'high'],
  })
  @IsEnum(TypePriority)
  @IsNotEmpty()
  readonly priority: TypePriority;

  @ApiProperty({ type: TaskList })
  @IsNotEmpty()
  @IsTaskListExist()
  readonly status: TaskList;
}
