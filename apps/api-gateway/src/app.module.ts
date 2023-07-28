import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { AssetsModule } from './assets/assets.module';
import { OrdersModule } from './orders/orders.module';
import { TranslationsModule } from './translations/translations.module';
import { UsersModule } from './users/users.module';
import { HttpExceptionFilter } from '@app/common';

@Module({
  imports: [
    AuthModule,
    AssetsModule,
    OrdersModule,
    TranslationsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
