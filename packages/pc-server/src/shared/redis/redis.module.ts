import type { RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Config, useConfigService } from '@/config/configuration';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => {
        return useConfigService(configService)
          .get(Config.REDIS);
      },
    }, true),
  ],
})
export class RedisCacheModule {}
