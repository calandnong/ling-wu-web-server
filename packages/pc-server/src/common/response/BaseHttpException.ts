import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseHttpException extends HttpException {
  httpCode: HttpStatus = HttpStatus.OK;
  constructor(
    response: string | Record<string, any>,
    status: number,
    httpCode: HttpStatus = HttpStatus.OK,
  ) {
    super(response, status);
    this.httpCode = httpCode;
  }
}
