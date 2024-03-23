import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChangeHistoryTasksService } from './change-history-tasks.service';
import { CreateTaskHistoryDto } from './dto/create-task-history.tdo';
import { BACKEND_ROUTES } from 'src/constants/routes.const';

@Controller(BACKEND_ROUTES.TASK_HISTORY)
export class ChangeHistoryTasksController {
  constructor(
    private readonly tasksHistoryService: ChangeHistoryTasksService,
  ) {}

  @Post()
  createTaskHistory(@Body() taskHistoryDto: CreateTaskHistoryDto) {
    return this.tasksHistoryService.createTaskHistory(taskHistoryDto);
  }

  @Get()
  findAll() {
    return this.tasksHistoryService.getAllTaskHistory();
  }
}
