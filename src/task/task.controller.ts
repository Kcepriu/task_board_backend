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
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { Task } from './task.model';

@ApiTags('Task')
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
  @ApiOperation({ summary: 'Get task by id' })
  @ApiParam({ name: 'id', required: true, description: 'Task identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Task,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findById(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }

  @Delete(':id')
  @UseInterceptors(LoggingTaskInterceptor)
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
