import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AppConfigModule } from '@/config/config.module';
import { Config, useConfigService } from '@/config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return useConfigService(configService)
          .get(Config.DB);
      },
    }),
  ],
})
export class DBModule {}
