import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { AssetsModule } from './assets/assets.module';
import { OrdersModule } from './orders/orders.module';
import { TranslationsModule } from './translations/translations.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    AssetsModule,
    OrdersModule,
    TranslationsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
