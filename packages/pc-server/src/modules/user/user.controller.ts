import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import type { User } from './user.entity';
import { UserInfo } from '@/common/decorators/jwt.decorator';
import { JWTUserInfo } from '@/shared/jwt/jwt.strategy';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '获取用户列表' })
  @Get('/getList')
  getList(@UserInfo() user: JWTUserInfo): Promise<User[]> {
    console.log('获取用户列表', user);
    return this.userService.getList();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '获取个人的用户信息' })
  @Get('/getUserInfo')
  getUserInfo(@UserInfo() userInfo: JWTUserInfo) {
    return this.userService.findById(userInfo.id);
  }
}
