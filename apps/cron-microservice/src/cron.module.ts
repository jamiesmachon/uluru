import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpExceptionFilter, MysqlModule } from '@app/common';
import { CronService } from './cron.service';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [MysqlModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [
    CronService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class CronModule {}
