import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskListDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
