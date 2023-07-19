import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MysqlModule } from '@app/common';
import { CronService } from './cron.service';

@Module({
  imports: [MysqlModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [CronService],
})
export class CronModule {}
