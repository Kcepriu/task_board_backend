import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { TaskService } from './task.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class TaskExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly taskService: TaskService) {}

  async validate(id: number) {
    try {
      const task = await this.taskService.getTaskById(id);
      return !!task;
    } catch (e) {
      return false;
    }

    return true;
  }

  //  defaultMessage(args: ValidationArguments) {
  defaultMessage() {
    return `Task doesn't exist`;
  }
}

export function IsTaskExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsTaskExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: TaskExistsRule,
    });
  };
}
