// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require('rollup-plugin-esbuild').default;
const dts = require('rollup-plugin-dts').default;
const NodeResolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs').default;
const { defineConfig } = require('rollup');

/**
 * 不打包进入dist的依赖
 */
const externals = [
];

/**
 * esbuild插件
 */
const esbuildPlugin = esbuild();
/**
 * 打包.d.ts插件
 */
const dtsPlugin = dts();

/**
 * rollup配置
 */
const rollupConfigs = [];

/**
 * 当前包地址
 */
const BASE_PATH = './';

// eslint-disable-next-line no-console
console.log('BASE_PATH', BASE_PATH);

/**
 * 包文件入口
 */
const input = `${BASE_PATH}/index.ts`;
/**
 * 包文件输出
 */
const output = [];

/**
 * 插件配置
 */
const plugin = [];

// 打包cjs
output.push({
  file: `${BASE_PATH}/dist/index.cjs`,
  format: 'cjs',
});

// 是否打包mjs
output.push({
  file: `${BASE_PATH}/dist/index.mjs`,
  format: 'es',
});

plugin.push(commonjs());
plugin.push(NodeResolve({
  preferBuiltins: false,
}));

// 构建cjs/mjs文件
rollupConfigs.push({
  input,
  output,
  plugins: [
    esbuildPlugin,
    ...plugin,
  ],
  external: [
    ...externals,
  ],
});

// 生成.d.ts类型文件
rollupConfigs.push({
  input,
  output: {
    file: `${BASE_PATH}/dist/index.d.ts`,
    format: 'es',
  },
  plugins: [
    dtsPlugin,
  ],
  external: [
    ...externals,
  ],
});

module.exports = defineConfig(rollupConfigs);
