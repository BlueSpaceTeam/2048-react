/*
 * @Author: tim.wen
 * @Date: 2022-07-06 19:37:14
 * @LastEditTime: 2022-07-07 20:15:39
 * @LastEditors: tim.wen
 * @Description: file content
 * @FilePath: /2048-react/react/webpack/rules.config.js
 */

/* eslint-disable @typescript-eslint/no-var-requires */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rulesConfig = [
  {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
  },
  {
    test: /\.s[ac]ss$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
  },
  {
    test: /\.ts[x]?$/,
    exclude: /node_modules/,
    use: ['babel-loader', 'ts-loader'],
  },
  {
    test: /\.(svg|png|jpg|gif)$/,
    type: 'asset/resource',
  },
  {
    test: /\.mp3$/,
    use: ['file-loader'],
  },
];

module.exports = rulesConfig;
