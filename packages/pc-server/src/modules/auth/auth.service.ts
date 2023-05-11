import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwt: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.find(username);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async signin(username: string, password: string) {
    const user = await this.userService.find(username);
    if (!user) {
      throw new ForbiddenException('用户不存在，请注册');
    }
    // 用户密码进行比对
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new ForbiddenException('用户名或者密码错误');
    }
    return await this.jwt.signAsync({
      username: user.username,
      sub: user.id,
    });
  }

  async signup(username: string) {
    const user = await this.userService.find(username);

    if (user) {
      throw new ForbiddenException('用户已存在');
    }

    const res = await this.userService.create({
      username,
    });

    return res;
  }
}
