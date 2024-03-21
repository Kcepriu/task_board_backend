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
import { TaskExistMiddleware } from './task/taskExist.middleware';
import { TaskController } from './task/task.controller';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TaskExistMiddleware)
      .exclude({ path: '/api/task', method: RequestMethod.POST })
      .forRoutes(TaskController);
  }
}
