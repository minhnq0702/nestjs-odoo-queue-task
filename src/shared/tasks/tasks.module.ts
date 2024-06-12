import { Task, TaskSchmea } from '@/entities/task.entity';
import { LoggerModule } from '@/logger/logger.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchmea }]),
    LoggerModule.register('Shared/Tasks')
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
