/**
 * 接口返回公共结构
 */
interface CommonResponse<Data = unknown> {
    /**
     * 状态码
     */
    code: number;
    /**
     * 自定义信息
     */
    message: string;
    /**
     * 自定义数据
     */
    data?: Data;
}
/**
 * 默认的接口成功码
 */
declare const DEFAULT_API_SUCCESS_CODE: 200;

/**
 * 更简洁的方式使用promise
 * @param promise
 * @return 返回[错误, 数据]
 */
declare function to<T, U = Error>(promise: Promise<T>): Promise<[U, undefined] | [null, T]>;

declare const index_to: typeof to;
declare namespace index {
  export {
    index_to as to,
  };
}

export { CommonResponse, DEFAULT_API_SUCCESS_CODE, index as utils };
