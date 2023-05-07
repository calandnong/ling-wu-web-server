import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('用户模块')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: '获取用户列表' })
  @Post('/getList')
  getList() {
    return this.userService.getList();
  }
}
