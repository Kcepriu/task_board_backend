import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.model';
import { ChangeHistoryTasksModule } from 'src/change-history-tasks/change-history-tasks.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    TypeOrmModule.forFeature([Task]),
    ChangeHistoryTasksModule,
    AuthModule,
    UserModule,
  ],
  exports: [TaskService],
})
export class TaskModule {}
