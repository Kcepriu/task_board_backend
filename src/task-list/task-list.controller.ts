import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { CreateTaskListDto } from './dto/create-task-list.tdo';
import { BACKEND_ROUTES } from 'src/constants/routes.const';

@Controller(BACKEND_ROUTES.TASK_LIST)
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post()
  createTaskList(@Body() taskListDto: CreateTaskListDto) {
    return this.taskListService.createTaskList(taskListDto);
  }

  @Patch(':id')
  editTaskList(
    @Param('id') id: number,
    @Body() taskListDto: CreateTaskListDto,
  ) {
    return this.taskListService.editTaskList(id, taskListDto);
  }

  @Get()
  findAll() {
    return this.taskListService.getAllTaskList();
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.taskListService.deleteTaskList(id);
  }
}
