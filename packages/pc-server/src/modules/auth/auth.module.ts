import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppJwtModule } from '@/shared/jwt/jwt.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    AppJwtModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
