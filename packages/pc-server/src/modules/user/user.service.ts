import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { User } from './users.entity';
import { BaseResponse } from '@/common/response/BaseResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // 使用泛型注入对应类型的存储库实例
    private readonly redisService: RedisService,
  ) {
  }

  async getList() {
    const data = await this.userRepository.find();
    return BaseResponse.toSuccess(data, '获取成功');
  }
}
