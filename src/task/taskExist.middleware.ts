import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TaskService } from './task.service';

@Injectable()
export class TaskExistMiddleware implements NestMiddleware {
  constructor(private readonly taskService: TaskService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params['id'];
    const task = await this.taskService.getTaskById(Number(id));
    if (!task) throw new BadRequestException(`Not found task with id = ${id}`);
    next();
  }
}
