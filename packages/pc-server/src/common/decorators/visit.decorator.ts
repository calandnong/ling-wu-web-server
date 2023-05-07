import { SetMetadata } from '@nestjs/common';

/**
 * 访问权限的元数据的key
 */
export const VISIT_META_KEY = 'VISIT_RIGHTS_META' as const;

export enum VISIT_RIGHTS {
  PUBLIC = 'public',
  PRIVATE = 'private',
  NOT_ALL_PUBLIC = 'not-all-public',
}
/**
 * 开放权限
 * @returns
 */
export const Public = () => SetMetadata(VISIT_META_KEY, VISIT_RIGHTS.PUBLIC);

/**
 * 验证权限
 * @returns
 */
export const Private = () => SetMetadata(VISIT_META_KEY, VISIT_RIGHTS.PRIVATE);

/**
 * 开放的同时存在token的话，也尝试解析
 */
export const NotAllPublic = () =>
  SetMetadata(VISIT_META_KEY, VISIT_RIGHTS.NOT_ALL_PUBLIC);
