import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ChangeHistoryTasksService } from './change-history-tasks.service';
import { BACKEND_ROUTES } from 'src/constants/routes.const';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller(BACKEND_ROUTES.TASK_HISTORY)
export class ChangeHistoryTasksController {
  constructor(
    private readonly tasksHistoryService: ChangeHistoryTasksService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.tasksHistoryService.getAllTaskHistory(req.user.id);
  }
}
