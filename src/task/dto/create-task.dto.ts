import { TypePriority } from 'src/types/models.types';

export class CreateTaskDto {
  readonly name: string;
  readonly description: string;
  readonly due_date: number;
  readonly priority: TypePriority;
}
