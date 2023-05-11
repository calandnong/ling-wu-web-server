import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { User } from './user.entity';
import { BaseResponse } from '@/common/response/BaseResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getList() {
    const data = await this.userRepository.find();
    return BaseResponse.toSuccess(data, '获取成功');
  }

  find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(user: Partial<User>) {
    const userTmp = await this.userRepository.create(user);
    // 对用户密码使用argon2加密
    userTmp.password = await argon2.hash(userTmp.password);
    const res = await this.userRepository.save(userTmp);
    return res;
  }
}
