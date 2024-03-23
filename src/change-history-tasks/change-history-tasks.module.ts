import { Module } from '@nestjs/common';
import { ChangeHistoryTasksService } from './change-history-tasks.service';
import { ChangeHistoryTasksController } from './change-history-tasks.controller';
import { ChangeHistoryTask } from './change-history-tasks.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ChangeHistoryTasksController],
  providers: [ChangeHistoryTasksService],
  imports: [TypeOrmModule.forFeature([ChangeHistoryTask])],
  exports: [ChangeHistoryTasksService],
})
export class ChangeHistoryTasksModule {}
