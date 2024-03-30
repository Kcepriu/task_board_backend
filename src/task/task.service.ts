import { BadRequestException, Injectable } from '@nestjs/common';
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

    const createTask = await this.taskRepository.findOneBy({
      id: task.id,
    });
    return createTask;
  }

  async getAllTask(): Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      relations: {
        status: true,
      },
    });
    return tasks;
  }

  async getTaskByIdWithoutHistory(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        id,
      },
    });

    // if (!task) throw new BadRequestException(`Not found task with id = ${id}`);

    return task;
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        id,
      },
      relations: {
        histories: true,
      },
    });
    return task;
  }

  async deleteTask(id: number) {
    const task = await this.taskRepository.findOneBy({
      id,
    });

    if (!task) throw new BadRequestException(`Not found task with id = ${id}`);

    await this.taskRepository.delete(id);
    return task;
  }

  async editTask(id: number, dto: CreateTaskDto) {
    const task = await this.taskRepository.findOneBy({
      id,
    });

    if (!task) throw new BadRequestException(`Not found task with id = ${id}`);

    await this.taskRepository.save({
      ...task,
      ...dto,
    });

    const updateTask = await this.taskRepository.findOneBy({
      id,
    });

    return updateTask;
  }
}
