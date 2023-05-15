/**
 * 接口返回公共结构
 */
export interface CommonResponse<Data = unknown> {
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
export const DEFAULT_API_SUCCESS_CODE = 200 as const;
