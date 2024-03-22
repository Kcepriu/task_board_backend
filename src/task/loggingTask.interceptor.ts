import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskService } from './task.service';

@Injectable()
export class LoggingTaskInterceptor implements NestInterceptor {
  constructor(private readonly taskService: TaskService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const method = request.method; // PATCH
    const params = request.params; // params
    console.log('🚀 ~ request.:', method);

    // const task = await this.taskService.getTaskById(5);
    // console.log('🚀 ~ task:', task);

    return next.handle().pipe(
      map((data) => {
        console.log(data); // Отримання даних, які повертає сервер
        return data; // Повертаємо дані без змін
      }),
    );
  }
}
