import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Task } from './task/task.model';
import { TaskListModule } from './task-list/task-list.module';
import { TaskList } from './task-list/task-list.model';
import { TaskListController } from './task-list/task-list.controller';
import { TaskListExistMiddleware } from './task-list/taskListExist.middleware';
import { TaskExistMiddleware } from './task/taskExist.middleware';
import { TaskController } from './task/task.controller';
import { TaskListExistsRule } from './task/isTaskListExist.validator';
import { BACKEND_ROUTES } from 'src/constants/routes.const';
import { ChangeHistoryTasksModule } from './change-history-tasks/change-history-tasks.module';
import { TaskExistsRule } from './task/isTaskExist.validator';

@Module({
  imports: [
    TaskModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Task, TaskList],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TaskListModule,
    ChangeHistoryTasksModule,
  ],
  controllers: [],
  providers: [TaskListExistsRule, TaskExistsRule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TaskExistMiddleware)
      .exclude(
        { path: BACKEND_ROUTES.TASK, method: RequestMethod.POST },
        { path: BACKEND_ROUTES.TASK, method: RequestMethod.GET },
      )
      .forRoutes(TaskController);

    consumer
      .apply(TaskListExistMiddleware)
      .exclude(
        { path: BACKEND_ROUTES.TASK_LIST, method: RequestMethod.POST },
        { path: BACKEND_ROUTES.TASK_LIST, method: RequestMethod.GET },
      )
      .forRoutes(TaskListController);
  }
}
