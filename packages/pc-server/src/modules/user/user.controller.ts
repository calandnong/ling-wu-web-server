import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserPipe } from './pipes/create-user.pipe';
import type { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '获取用户列表' })
  @UseGuards(AuthGuard('jwt'))
  @Post('/getList')
  getList() {
    return this.userService.getList();
  }

  @ApiOperation({ summary: '用户注册' })
  @Post()
  addUser(@Body(CreateUserPipe) dto: CreateUserDto): any {
    const user = dto as User;
    return this.userService.create(user);
  }
}
