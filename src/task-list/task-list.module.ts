import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListService } from './task-list.service';
import { TaskListController } from './task-list.controller';
import { TaskList } from './task-list.model';

@Module({
  controllers: [TaskListController],
  providers: [TaskListService],
  imports: [TypeOrmModule.forFeature([TaskList])],
  exports: [TaskListService],
})
export class TaskListModule {}
