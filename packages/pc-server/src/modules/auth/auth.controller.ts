import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('用户认证')
@Controller('auth')
export class AuthController {
  @Post('/getToken')
  getToken() {
    return {
      code: 200,
      msg: '完成',
    };
  }
}
