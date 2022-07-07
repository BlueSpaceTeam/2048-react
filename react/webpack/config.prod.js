/*
 * @Author: tim.wen
 * @Date: 2022-07-06 19:16:59
 * @LastEditTime: 2022-07-07 19:31:21
 * @LastEditors: tim.wen
 * @Description: file content
 * @FilePath: /2048-react/react/webpack/config.prod.js
 */

/* eslint-disable @typescript-eslint/no-var-requires */

// 合并规则
const { merge } = require('webpack-merge');

// 清理原来的打包文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 压缩css文件
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

// 导入基础配置
const baseConfig = require('./config.base.js');

module.exports = merge(baseConfig, {
  // 环境配置：生产环境
  mode: 'production',
  plugins: [new CleanWebpackPlugin(), new CssMinimizerWebpackPlugin()],
});
