/*
 * @Author: tim.wen
 * @Date: 2022-07-07 19:29:14
 * @LastEditTime: 2022-07-07 19:34:21
 * @LastEditors: tim.wen
 * @Description: file content
 * @FilePath: /2048-react/react/webpack/plugins.config.js
 */

/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

// 引入HTML插件
const HTMLWebpackPlugin = require('html-webpack-plugin');

// css 代码打包分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pluginsConfig = [
  new HTMLWebpackPlugin({
    // title: '2048 - React',
    template: path.resolve(__dirname, '../public/index.html'), // 生成HTML文件所需要的模板文件
    minify: {
      removeComments: true, // 打包后移除html文件中的注释
    },
    // 导入ico文件
    favicon: path.resolve(__dirname, '../public/favicon.ico'),
    // 导入manifest文件
    // manifest: path.resolve(__dirname, 'public', 'manifest.json'),
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[chunkhash:8].css',
  }),
];

module.exports = pluginsConfig;
