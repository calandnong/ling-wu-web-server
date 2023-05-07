import type { RedisModuleOptions, RedisClientOptions } from '@liaoliaots/nestjs-redis';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => {
        const redisConfig = configService.get<RedisClientOptions>('redis');
        return {
          config: {
            ...redisConfig,
          },
        };
      },
    }, true),
  ],
})
export class RedisCacheModule {}
