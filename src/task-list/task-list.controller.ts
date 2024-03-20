import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { CreateTaskListDto } from './dto/create-task-list.tdo';

@Controller('/api/task-list')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post()
  createTaskList(@Body() taskListDto: CreateTaskListDto) {
    return this.taskListService.createTaskList(taskListDto);
  }

  @Get()
  findAll() {
    return this.taskListService.getAllTaskList();
  }
}
