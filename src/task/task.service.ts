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

  async createTask(dto: CreateTaskDto, userId: number) {
    const task = await this.taskRepository.save({
      ...dto,
      user: { id: userId },
    });

    const createTask = await this.taskRepository.findOneBy({
      id: task.id,
    });
    return createTask;
  }

  async getAllTask(userId: number): Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      select: {
        user: {
          id: true,
          name: true,
        },
      },
      where: {
        user: { id: userId },
      },
      relations: {
        status: true,
        user: true,
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
    return task;
  }

  async getTaskById(id: number, userId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
      relations: {
        histories: true,
      },
    });

    if (!task) throw new BadRequestException(`Not found task with id = ${id}`);

    return task;
  }

  async deleteTask(id: number, userId: number) {
    const task = await this.taskRepository.findOneBy({
      id,
      user: { id: userId },
    });

    if (!task) throw new BadRequestException(`Not found task with id = ${id}`);

    await this.taskRepository.delete(id);
    return task;
  }

  async editTask(id: number, dto: CreateTaskDto, userId: number) {
    const task = await this.taskRepository.findOneBy({
      id,
      user: { id: userId },
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
