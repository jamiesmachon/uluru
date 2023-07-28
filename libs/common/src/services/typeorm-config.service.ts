import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      database: this.configService.get('DB_NAME'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      entities: [__dirname + '/../entities/index{.ts,.js}'],
      // migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      synchronize: this.configService.get<boolean>('DB_SYNC'),
    };
  }
}
