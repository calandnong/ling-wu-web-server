import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import type {
  PipeTransform,
  ArgumentMetadata,
} from '@nestjs/common';
import {
  Injectable,
} from '@nestjs/common';
import { ValidationException, ValidationExceptionCode } from '../exceptions/validation.exception';

/**
 * 校验数据的报错信息Map，TODO: 待设计
 */
export const VALIDATION_MESSAGE_MAP = {};

@Injectable()
export class ValidationPipe implements PipeTransform {
  // value 是当前处理的参数，而 metatype 是属性的元类型
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    console.log('进入全局管道...');
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // plainToClass方法将普通的javascript对象转换为特定类的实例
    const object = plainToClass(metatype, value);
    // 验证该对象返回出错的数组
    const errors = await validate(object);
    if (errors.length > 0) {
      console.log('errors', errors);
      // 将错误信息数组中的第一个内容返回给异常过滤器
      const errorMsg = errors.shift().constraints;
      console.log(Object.values(errorMsg));
      const messageArr = Object.values(errorMsg);
      const message = messageArr.join(',');
      throw new ValidationException(ValidationExceptionCode.INVALID_PARAMS, message);
    }
    return value;
  }

  // 验证属性值的元类型是否是String, Boolean, Number, Array, Object中的一种
  private toValidate(metatype: unknown): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype as (typeof types)[number]);
  }
}
