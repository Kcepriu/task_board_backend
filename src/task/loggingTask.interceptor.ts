import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskService } from './task.service';
import { ChangeHistoryTasksService } from 'src/change-history-tasks/change-history-tasks.service';
import { TypeOperation } from 'src/types/models.types';

interface IParam {
  nameTask: string;
  operation: string;
  data_before: string;
  data_after: string;
  task?: number;
}

@Injectable()
export class LoggingTaskInterceptor implements NestInterceptor {
  constructor(
    private readonly taskService: TaskService,
    private readonly tasksHistoryService: ChangeHistoryTasksService,
  ) {}

  private async saveHistory(data: IParam) {
    //@ts-expect-error "it is true"
    await this.tasksHistoryService.createTaskHistory({
      due_date: Date.now(),
      ...data,
    });
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const operation = request.method; // PATCH

    let data_before = '';
    let nameTask = '';

    if (operation === 'PATCH' || operation === 'DELETE') {
      const params = request.params;
      const id = Number(params.id || 0);
      const task = await this.taskService.getTaskByIdWithoutHistory(id);
      data_before = JSON.stringify(task);
      nameTask = task.name;
    }

    return next.handle().pipe(
      map((data) => {
        const id = operation === 'DELETE' ? null : data.id;
        if (!nameTask) nameTask = data.name;
        const data_after = operation === 'DELETE' ? '' : JSON.stringify(data);

        this.saveHistory({
          nameTask,
          operation: TypeOperation[operation],
          data_before,
          data_after,
          task: id,
        });

        return data; // Повертаємо дані без змін
      }),
    );
  }
}

// Треба записувати лог в бази
// Таска, метод, і дані до і дані після
