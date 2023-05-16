import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AppJwtService } from './jwt.service';
import { Config, useConfigService } from '@/config/configuration';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return useConfigService(configService)
          .get(Config.JWT);
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AppJwtService, JwtStrategy],
  exports: [AppJwtService],
})
export class AppJwtModule {}
