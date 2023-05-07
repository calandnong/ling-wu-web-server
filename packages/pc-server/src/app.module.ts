import { Module } from '@nestjs/common';
import { modules } from '@/modules';
import { AppConfigModule } from '@/config/config.module';
import { RedisCacheModule } from '@/shared/redis/redis.module';
import { DBModule } from '@/shared/db/db.module';

@Module({
  imports: [AppConfigModule, DBModule, RedisCacheModule, ...modules],
  controllers: [],
  providers: [],
})
export class AppModule {}
