import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TaskListService } from './task-list.service';

@Injectable()
export class TaskListExistMiddleware implements NestMiddleware {
  constructor(private readonly taskListService: TaskListService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params['id'];
    const task = await this.taskListService.getTaskListById(Number(id));
    if (!task)
      throw new BadRequestException(`Not found task list with id = ${id}`);
    next();
  }
}
