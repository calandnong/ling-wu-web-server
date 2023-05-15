import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 查询用户列表
   * @returns
   */
  async getList() {
    const data = await this.userRepository.find();
    return data;
  }

  /**
   * @description 根据用户名查找用户信息
   * @param username 用户名
   * @returns 查找到的用户信息
   */
  find(username: string) {
    return this
      .userRepository
      .findOne({
        where: { username },
        select: [
          'id',
          'username',
          'password',
          'createTime',
          'updateTime',
        ],
      });
  }

  /**
   * 根据用户id查找用户信息
   */
  findById(id: number) {
    return this
      .userRepository
      .findOne({
        where: { id },
      });
  }

  /**
   * @description 根据用户名、密码注册用户
   * @param user 用户名、密码
   * @returns 注册的用户信息
   */
  async create(user: Partial<User>) {
    const userTempInfo = this.userRepository.create(user);
    const userInfo = await this.userRepository.save(userTempInfo);
    return userInfo;
  }
}
