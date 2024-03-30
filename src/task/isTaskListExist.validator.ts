import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { TaskListService } from '../task-list/task-list.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class TaskListExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly taskListService: TaskListService) {}

  async validate(id: number) {
    try {
      const taskList = await this.taskListService.getTaskListById(id);
      return !!taskList;
    } catch (e) {
      return false;
    }

    return true;
  }

  //  defaultMessage(args: ValidationArguments) {
  defaultMessage() {
    return `Task list doesn't exist`;
  }
}

export function IsTaskListExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsTaskListExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: TaskListExistsRule,
    });
  };
}
