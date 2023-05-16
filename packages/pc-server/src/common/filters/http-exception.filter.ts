import type {
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import {
  Catch,
  Logger,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import type { Response } from 'express';
import { BaseException } from '../exceptions/base.exception';
import { BaseResponse } from '../response/BaseResponse';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // exception 当前正在处理的异常对象
  // host 是传递给原始处理程序的参数的一个包装(Response/Request)的引用
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('进入全局异常过滤器...');
    console.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const defaultMessage = '错误解析异常';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    const error = new BaseResponse(status);
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      error.code = status;
      error.message = exception.message;
      if (exception instanceof BaseException) {
        const response = exception.getResponse();
        error.code = response.code;
        error.message = response.message;
      }
    }
    else {
      let msg = '';
      // 如果是对象，且不是Error类或者其派生类的实例，则尝试序列化输出
      if (typeof exception === 'object' && !(exception instanceof Error)) {
        try {
          /**
           * 当在循环引用时会抛出异常TypeError ("cyclic object value")（循环对象值）
           * 当尝试去转换 BigInt 类型的值会抛出TypeError ("BigInt value can't be serialized in JSON")（BigInt值不能JSON序列化）.
           */
          msg = JSON.stringify(exception);
        }
        catch (errorMessage) {
          // 设置默认信息
          msg = `${defaultMessage}, ${errorMessage.message}`;
          console.error(errorMessage);
        }
      }
      // 赋值顺序：Error类的实例的message || 对象，且不是Error类或者其派生类的实例的尝试序列化 || 值类型
      if (exception instanceof Error) {
        error.message = exception.message;
      }
      else {
        error.message = msg || String(exception);
      }
    }

    // 打印错误综合日志
    Logger.error('错误信息', JSON.stringify(error), 'HttpExceptionFilter');
    response.status(status).json(error);
  }
}
