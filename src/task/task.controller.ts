import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  UseInterceptors,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { LoggingTaskInterceptor } from 'src/task/loggingTask.interceptor';
import { BACKEND_ROUTES } from 'src/constants/routes.const';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller(BACKEND_ROUTES.TASK)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.taskService.getAllTask(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findById(@Req() req, @Param('id') id: number) {
    return this.taskService.getTaskById(id, req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingTaskInterceptor)
  createTask(@Req() req, @Body() taskDto: CreateTaskDto) {
    return this.taskService.createTask(taskDto, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingTaskInterceptor)
  editTaskList(
    @Req() req,
    @Param('id') id: number,
    @Body() taskDto: CreateTaskDto,
  ) {
    return this.taskService.editTask(id, taskDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LoggingTaskInterceptor)
  deleteTask(@Req() req, @Param('id') id: number) {
    return this.taskService.deleteTask(id, req.user.id);
  }
}
