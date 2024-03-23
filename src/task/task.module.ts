import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.model';
import { ChangeHistoryTasksModule } from 'src/change-history-tasks/change-history-tasks.module';
@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [TypeOrmModule.forFeature([Task]), ChangeHistoryTasksModule],
  exports: [TaskService],
})
export class TaskModule {}
