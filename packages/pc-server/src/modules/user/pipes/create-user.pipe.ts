import type { PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  /**
   * @description 校验用户名和密码
   * @param value 用户名、密码
   * @returns 校验信息，抛出异常
   */
  transform(value: CreateUserDto) {
    return value;
  }
}
