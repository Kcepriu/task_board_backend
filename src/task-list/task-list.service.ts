import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from './task-list.model';
import { CreateTaskListDto } from './dto/create-task-list.tdo';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
  ) {}

  async createTaskList(dto: CreateTaskListDto) {
    const task = await this.taskListRepository.save(dto);

    return task;
  }

  async getAllTaskList(): Promise<TaskList[]> {
    const tasks = await this.taskListRepository.find();
    return tasks;
  }
}
