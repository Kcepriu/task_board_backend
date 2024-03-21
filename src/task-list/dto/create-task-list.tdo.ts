import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskListDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
