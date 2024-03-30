import { Injectable } from '@nestjs/common';
import { ChangeHistoryTask } from './change-history-tasks.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskHistoryDto } from './dto/create-task-history.tdo';

@Injectable()
export class ChangeHistoryTasksService {
  constructor(
    @InjectRepository(ChangeHistoryTask)
    private taskHistoryRepository: Repository<ChangeHistoryTask>,
  ) {}

  async getAllTaskHistory(): Promise<ChangeHistoryTask[]> {
    const tasks = await this.taskHistoryRepository.find({
      order: {
        due_date: 'DESC',
      },
    });
    return tasks;
  }

  async createTaskHistory(
    dto: CreateTaskHistoryDto,
  ): Promise<ChangeHistoryTask> {
    const taskHistory = await this.taskHistoryRepository.save(dto);

    const createTaskHistory = await this.taskHistoryRepository.findOneBy({
      id: taskHistory.id,
    });
    return createTaskHistory;
  }
}
