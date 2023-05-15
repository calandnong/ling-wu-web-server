import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';
import { BaseResponse } from '@/common/response/BaseResponse';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<unknown> {
    const user = await this.userService.find(username);
    if (user?.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * @description 用户登录方法
   * @param username 用户名
   * @param password 用户密码
   * @returns 当前登录用户token
   */
  async signIn(username: string, password: string) {
    const user = await this.userService.find(username);

    if (!user) {
      // throw new ForbiddenException('用户不存在，请注册');
      return BaseResponse.toErrorJustMessage('用户不存在，请注册');
    }
    // 用户密码进行比对
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      // throw new ForbiddenException('用户名或者密码错误');
      return BaseResponse.toErrorJustMessage('用户名或者密码错误');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * @description 用户注册方法
   * @param username 用户名
   * @returns 注册的用户名
   */
  async signUp(username: string, password: string) {
    const user = await this.userService.find(username);

    if (user) {
      // throw new ForbiddenException('用户已存在');
      return BaseResponse.toErrorJustMessage('用户已存在');
    }

    const res = await this.userService.create({
      username,
      password,
    });

    return res;
  }
}
