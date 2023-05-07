import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { merge } from 'lodash';

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
