import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskExist } from './taskExist.decorator';

@Controller('/api/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() taskDto: CreateTaskDto) {
    return this.taskService.createTask(taskDto);
  }

  @Get()
  findAll() {
    return this.taskService.getAllTask();
  }

  @Delete(':id')
  deleteTask(@TaskExist('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
