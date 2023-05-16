import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { modules } from '@/modules';
import { AppConfigModule } from '@/config/config.module';
import { RedisCacheModule } from '@/shared/redis/redis.module';
import { DBModule } from '@/shared/db/db.module';

@Module({
  imports: [
    AppConfigModule,
    DBModule,
    RedisCacheModule,
    ...modules,
  ],
  controllers: [],
  providers: [
    // 注册全局守卫
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
