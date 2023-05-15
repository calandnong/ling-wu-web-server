import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { CodeDto } from './dto/code.dto';
import { PhoneLoginDto } from './dto/phone-login.dto';
import { SignUserDto } from './dto/signin-user.dto';
import type { Auth } from './auth.types';
import { UserTempMessage } from '@/shared/redis/dto/user-temp-redis.dto';
import { SkipJWTCheck } from '@/common/decorators/jwt.decorator';

@ApiTags('用户认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipJWTCheck()
  @ApiOperation({ summary: '手机号登陆' })
  @Post('/login')
  async login(@Body() phoneLoginDot: PhoneLoginDto) {
    return phoneLoginDot;
  }

  @SkipJWTCheck()
  @ApiOperation({ summary: '开发获取' })
  @Post('/mockLogin')
  async mockLogin() {
    return [];
  }

  @ApiOperation({ summary: 'user profile' })
  @ApiBearerAuth()
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @SkipJWTCheck()
  @ApiOperation({ summary: '获取验证码' })
  @Post('/getCode')
  getCode(@Body() codeDto: CodeDto) {
    return codeDto;
  }

  @SkipJWTCheck()
  @ApiOperation({ summary: '检查验证码是否正确' })
  @Post('/checkCode')
  checkCode(@Body() userTempMessage: UserTempMessage) {
    return userTempMessage;
  }

  @SkipJWTCheck()
  @ApiOperation({ summary: '用户登录' })
  @Post('/signIn')
  signIn(@Body() dto: SignUserDto): Promise<Auth> {
    const { username, password } = dto;
    return this.authService.signIn(username, password);
  }

  @SkipJWTCheck()
  @ApiOperation({ summary: '用户注册' })
  @Post('/signUp')
  signUp(@Body() dto: SignUserDto): Promise<User> {
    const { username, password } = dto;
    return this.authService.signUp(username, password);
  }
}
