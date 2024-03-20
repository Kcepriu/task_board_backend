import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(dto: CreateTaskDto) {
    const task = await this.taskRepository.save(dto);

    return task;
  }

  async getAllTask(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();
    return tasks;
  }
}
