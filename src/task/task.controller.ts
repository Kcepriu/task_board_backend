import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { LoggingTaskInterceptor } from 'src/task/loggingTask.interceptor';
import { BACKEND_ROUTES } from 'src/constants/routes.const';

@Controller(BACKEND_ROUTES.TASK)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseInterceptors(LoggingTaskInterceptor)
  createTask(@Body() taskDto: CreateTaskDto) {
    return this.taskService.createTask(taskDto);
  }

  @Patch(':id')
  @UseInterceptors(LoggingTaskInterceptor)
  editTaskList(@Param('id') id: number, @Body() taskDto: CreateTaskDto) {
    return this.taskService.editTask(id, taskDto);
  }

  @Get()
  findAll() {
    return this.taskService.getAllTask();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }

  @Delete(':id')
  @UseInterceptors(LoggingTaskInterceptor)
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
