/*
 * @Author: tim.wen
 * @Date: 2022-07-06 18:29:26
 * @LastEditTime: 2022-07-07 20:00:30
 * @LastEditors: tim.wen
 * @Description: file content
 * @FilePath: /2048-react/react/webpack/config.base.js
 */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

const rulesConfig = require('./rules.config.js');
const pluginsConfig = require('./plugins.config.js');

const baseConfig = {
  // 指定入口文件
  entry: path.resolve(__dirname, '../src/index.tsx'),
  // 指定打包文件所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, '../dist'),
    // 打包后的文件名
    filename: '[name].bundle.js',
    environment: {
      // 不使用箭头函数
      // arrowFunction: false,
      // 不使用const（为了兼容IE10）
      // const: false,
    },
    publicPath: '/',
  },
  // 指定webpack打包时要用的模块
  module: {
    // 指定要加载的规则
    rules: [...rulesConfig],
  },
  // 设置哪些文件可以用于引用模块
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx', '.webpack.js', '.web.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@scss': path.resolve(__dirname, '../src/scss'),
      '@utils': path.resolve(__dirname, '../src/utils'),
    },
  },
  // 配置webpack插件
  plugins: [...pluginsConfig],
  // 性能提示
  performance: {
    // 打开/关闭提示
    hints: false,
    // 何时根据最大入口点大小（以字节为单位）发出性能提示
    maxEntrypointSize: 512000,
    // 何时根据单个资产大小（以字节为单位）发出性能提示
    maxAssetSize: 512000,
  },
};

module.exports = baseConfig;
