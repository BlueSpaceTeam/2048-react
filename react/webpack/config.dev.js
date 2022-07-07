/* eslint-disable @typescript-eslint/no-var-requires */

// 合并规则
const { merge } = require('webpack-merge');

// 错误提示插件
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// 导入基础配置
const baseConfig = require('./config.base.js');

module.exports = merge(baseConfig, {
  // 环境设置：开发环境
  mode: 'development',
  // 便于开发调试 这里开启source-map模式
  devtool: 'source-map',
  plugins: [new FriendlyErrorsWebpackPlugin()],
  // webpack-dev-server 的一下配置，webpack-dev-server 会提供一个本地服务(serve)
  devServer: {
    // 端口
    port: 8000,
    // 热更新
    hot: true,
    // 启动时打开浏览器
    // open: true,
    // progress: true,
    historyApiFallback: true,
    proxy: {
      '/query': {
        target: 'http://2048.ued.team/server',
        changeOrigin: true,
        pathRewrite: {
          '^/query': '',
        },
      },
    },
  },
});
