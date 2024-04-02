import { Module } from '@nestjs/common';
import { ChangeHistoryTasksService } from './change-history-tasks.service';
import { ChangeHistoryTasksController } from './change-history-tasks.controller';
import { ChangeHistoryTask } from './change-history-tasks.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ChangeHistoryTasksController],
  providers: [ChangeHistoryTasksService],
  imports: [
    TypeOrmModule.forFeature([ChangeHistoryTask]),
    AuthModule,
    UserModule,
  ],
  exports: [ChangeHistoryTasksService],
})
export class ChangeHistoryTasksModule {}
