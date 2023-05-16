import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

/**
 * 校验异常状态码: 400
 */
export enum ValidationExceptionCode {
  /**
   * 参数不正确
   */
  INVALID_PARAMS = 400,
}

export const ValidationExceptionMessage: Readonly<Record<ValidationExceptionCode, string>> = {
  [ValidationExceptionCode.INVALID_PARAMS]: '参数不正确',
};

/**
 * 校验异常状态,
 * 校验异常状态码: 400
 */
export class ValidationException extends BaseException {
  constructor(
    code: ValidationExceptionCode,
    message?: string,
    data?: unknown,
    status: HttpStatus = HttpStatus.OK,
  ) {
    super(code, message || ValidationExceptionMessage[code], status, data);
  }
}
