import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { merge } from 'lodash';
import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import type { RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import type { JwtModuleOptions } from '@nestjs/jwt';

// 配置文件名称
/**
 * 公共前缀
 */
const COMMON_PREFIX = 'config';

/**
 * 本地后缀
 */
const LOCAL = 'local';

/**
 * 默认配置文件（local）
 */
const DEFAULT_CONFIG_FILE_NAME_LOCAL = `${COMMON_PREFIX}.${LOCAL}.yaml` as const;

/**
 * 默认配置文件
 */
const DEFAULT_CONFIG_FILE_NAME = `${COMMON_PREFIX}.yaml` as const;

/**
 * 环境配置文件
 */
const ENV_CONFIG_FILE_NAME_LOCAL = `${COMMON_PREFIX}.${process.env.NODE_ENV}.${LOCAL}.yaml`;

/**
 * 环境配置文件
 */
const ENV_CONFIG_FILE_NAME = `${COMMON_PREFIX}.${process.env.NODE_ENV}.yaml`;

function checkFileExists(path: string) {
  return existsSync(path);
}

function loadYaml(path: string) {
  if (!checkFileExists(path)) {
    return {};
  }
  return yaml.load(readFileSync(path, 'utf8'));
}

// path
const defaultLocalConfig = loadYaml(join(__dirname, '../../config', DEFAULT_CONFIG_FILE_NAME_LOCAL));

const defaultConfig = loadYaml(join(__dirname, '../../config', DEFAULT_CONFIG_FILE_NAME));

const envConfigLocal = loadYaml(join(__dirname, '../../config', ENV_CONFIG_FILE_NAME_LOCAL));

const envConfig = loadYaml(join(__dirname, '../../config', ENV_CONFIG_FILE_NAME));

// 合并文件
const mergePath = merge(merge(defaultConfig, defaultLocalConfig), merge(envConfig, envConfigLocal));

export enum Config {
  /**
   * swagger配置
   */
  SWAGGER = 'swagger',
  /**
   * 服务配置
   */
  SERVER = 'server',
  /**
   * redis配置
   */
  REDIS = 'redis',
  /**
   * db配置
   */
  DB = 'db',
  /**
   * jwt配置
   */
  JWT = 'jwt',
}

export interface ServerConfig {
  /**
   * 端口
   */
  port: number;
}

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

export interface AppConfig {
  [Config.SERVER]: ServerConfig;
  [Config.SWAGGER]: SwaggerConfig;
  [Config.REDIS]: RedisModuleOptions;
  [Config.DB]: TypeOrmModuleOptions;
  [Config.JWT]: JwtModuleOptions;
}

/**
 * 使用app的配置模块
 * @param app app实例
 * @returns
 */
export function useAppConfig(app: INestApplication) {
  const configService = app.get(ConfigService);

  function get<Key extends Config>(key: Key) {
    return configService.get<AppConfig[Key]>(key);
  }

  return {
    get,
  };
}

export function useConfigService(configService: ConfigService) {
  function get<Key extends Config>(key: Key) {
    return configService.get<AppConfig[Key]>(key);
  }
  return {
    get,
  };
}

export const useConfig = () => {
  return {
    get<T>(key: Config) {
      return mergePath[key] as T;
    },
  };
};

export default () => {
  return mergePath;
};
