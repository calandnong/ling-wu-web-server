import { resolve } from 'node:path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AppConfigModule } from '../../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get('db');
        return {
          ...dbConfig,
          entities: [resolve(__dirname, '../**/*.entity{.ts,.js}')],
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DBModule {}
