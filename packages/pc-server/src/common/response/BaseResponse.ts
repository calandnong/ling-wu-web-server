export class BaseResponse<T = unknown> {
  constructor(public code?: number, public message?: string, public data?: T) {}

  static toSuccessJustMsg(message: string) {
    return new BaseResponse(200, message);
  }

  static toSuccessJustData<T>(data: T) {
    return new BaseResponse<T>(200, '请求成功', data);
  }

  static toSuccess<T>(data: T, message: string) {
    return new BaseResponse<T>(200, message, data);
  }

  static toCustomResponseJustMsg(code: number, message: string) {
    return new BaseResponse(code, message);
  }

  static toErrorJustMessage(message: string) {
    return BaseResponse.toCustomResponseJustMsg(500, message);
  }

  static toError(code: number, message: string) {
    return BaseResponse.toCustomResponseJustMsg(code, message);
  }
}
