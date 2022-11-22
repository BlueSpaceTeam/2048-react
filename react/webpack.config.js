/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

// Import HTML plugin / 引入HTML插件
const HTMLWebpackPlugin = require('html-webpack-plugin');

// Introduce the clean plugin / 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// const { SourceMapDevToolPlugin } = require('webpack')

const config = {
  // Specify the packaging method: 'none' | 'development' | 'production' / 指定打包模式
  mode: 'production',
  // Specify the entry file / 指定入口文件
  entry: './src/index.tsx',
  // Specify the directory where the package file is located / 指定打包文件所在目录
  output: {
    // Specify the directory of the package file / 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // Packaged file name / 打包后的文件名
    filename: 'bundle.js',
    environment: {
      // Not using arrow functions / 不使用箭头函数
      // arrowFunction: false,
      // Do not use const (for compatibility with IE10) / 不使用const（为了兼容IE10）
      // const: false,
    },
    publicPath: '/',
  },
  // Specify the modules to be used when webpack packs / 指定webpack打包时要用的模块
  module: {
    // Specifies the rules to load / 指定要加载的规则
    rules: [
      {
        // 'test' specifies the file in which the rule takes effect / 'test'指定的是规则生效的文件
        test: /\.js$/,
        // Loader to use / 要使用的loader
        use: ['babel-loader', 'source-map-loader'],
        // Files to exclude / 要排除的文件
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.ts(x)?$/,
        use: [
          // Configure babel / 配置babel
          {
            // Specified loader / 指定加载器
            loader: 'babel-loader',
            // Set up babel / 设置babel
            options: {
              // Set up a predefined environment / 设置预定义的环境
              presets: [
                [
                  // Plugins for specific environments / 指定环境的插件
                  '@babel/preset-env',
                  // Configuration information / 配置信息
                  {
                    // Compatible browser / 要兼容的浏览器
                    targets: {
                      chrome: '88',
                    },
                    // Specify the version of corejs / 指定corejs的版本
                    corejs: '3',
                    // The way to use corejs, 'usage' means loading on demand / 使用corejs的方式，'usage'表示按需加载
                    useBuiltIns: 'usage',
                  },
                ],
              ],
            },
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      // Set up sass file handling / 设置sass文件处理
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          // Import postcss / 引入postcss
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions',
                    },
                  ],
                ],
              },
            },
          },
          // Compile Sass to CSS / 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
      // Set up svg file handling / 设置svg文件处理
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      // Set up mp3 file handling / 设置mp3文件处理
      {
        test: /\.mp3$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  // Set which files can be used to reference modules / 设置哪些文件可以用于引用模块
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx', '.webpack.js', '.web.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@scss': path.resolve(__dirname, './src/scss'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  // Configure the webpack plugin / 配置webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: '2048 - React',
      // filename: './dist/index.html', // Configure the generated HTML file name / 配置生成的HTML文件名称
      template: path.resolve(__dirname, 'public', 'index.html'), // Template files required to generate HTML files / 生成HTML文件所需要的模板文件
      minify: {
        removeComments: true, // Remove comments in HTML files after packaging / 打包后移除HTML文件中的注释
      },
      // Import ico file / 导入ico文件
      favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
      // Import the manifest file / 导入manifest文件
      // manifest: path.resolve(__dirname, 'public', 'manifest.json'),
    }),
    // new SourceMapDevToolPlugin({
    //     filename: '[file].map',
    // }),
  ],
  // Performance Tips / 性能提示
  performance: {
    // Turn on/off hints / 打开/关闭提示
    hints: false,
    // When to emit a performance hint based on the maximum entry point size in bytes / 何时根据最大入口点大小（以字节为单位）发出性能提示
    maxEntrypointSize: 512000,
    // When to issue performance hints based on individual asset size in bytes / 何时根据单个资产大小（以字节为单位）发出性能提示
    maxAssetSize: 512000,
  },
  devServer: {
    compress: true,
    port: 8080,
    hot: true,
    proxy: {
      '/query': {
        target: 'https://2048.ued.team/server',
        changeOrigin: true,
      },
    },
    // Solve the problem of 404 after refreshing with BrowserRouter in react-router-dom / 解决react-router-dom中使用BrowserRouter刷新后404的问题
    historyApiFallback: true,
  },
};

module.exports = config;
