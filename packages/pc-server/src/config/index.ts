import type { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { useConfig } from './configuration';

export {
  useConfig,
};

export interface SwaggerConfig {
  /**
   * 是否开启
   */
  open: boolean;
  /**
   * 文档路径
   */
  path: string;
  /**
   * swagger标题
   */
  title: string;
  /**
   * swagger描述
   */
  description: string;
  /**
   * 接口版本
   */
  version: string;
  /**
   * 认证配置
   */
  bearerAuth: {
    type: string;
    in: string;
    name: string;
  } & SecuritySchemeObject;
}
