import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getTaskListById(id: number): Promise<TaskList> {
    const task = await this.taskListRepository.findOneBy({
      id,
    });

    return task;
  }

  async createTaskList(dto: CreateTaskListDto) {
    const task = await this.taskListRepository.save(dto);

    return task;
  }

  async getAllTaskList(): Promise<TaskList[]> {
    const tasks = await this.taskListRepository.find({
      relations: {
        tasks: true,
      },
    });
    return tasks;
  }

  async deleteTaskList(id: number) {
    const task = await this.taskListRepository.findOneBy({
      id,
    });

    if (!task)
      throw new BadRequestException(`Not found task list with id = ${id}`);

    await this.taskListRepository.delete(id);
    return task;
  }

  async editTaskList(id: number, dto: CreateTaskListDto) {
    const taskList = await this.taskListRepository.findOneBy({
      id,
    });

    if (!taskList)
      throw new BadRequestException(`Not found task list with id = ${id}`);

    const updateTaskList = this.taskListRepository.save({
      ...taskList,
      ...dto,
    });

    return updateTaskList;
  }
}
