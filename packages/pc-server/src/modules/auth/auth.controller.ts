import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CodeDto } from './dto/code.dto';
import { PhoneLoginDto } from './dto/phone-login.dto';
import { Public } from '@/common/decorators/visit.decorator';
import { UserTempMessage } from '@/shared/redis/dto/user-temp-redis.dto';

@ApiTags('用户认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: '手机号登陆' })
  @Post('/login')
  async login(@Body() phoneLoginDot: PhoneLoginDto) {
    return phoneLoginDot;
  }

  @Public()
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

  @Public()
  @ApiOperation({ summary: '获取验证码' })
  @Post('/getCode')
  getCode(@Body() codeDto: CodeDto) {
    return codeDto;
  }

  @Public()
  @ApiOperation({ summary: '检查验证码是否正确' })
  @Post('/checkCode')
  checkCode(@Body() userTempMessage: UserTempMessage) {
    return userTempMessage;
  }
}
