/*
 * @Author: tim.wen
 * @Date: 2022-06-28 17:01:44
 * @LastEditTime: 2022-06-30 19:59:07
 * @LastEditors: tim.wen
 * @Description: file content
 * @FilePath: /2048-react/react/.eslintrc.js
 */

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  // extends指定扩展的配置, 支持规则的覆盖和聚合
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    // 'plugin:react-hooks/recommended',
    // 'plugin:import/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  // plugins配置那些我们想要Linting规则的插件
  plugins: [
    '@typescript-eslint',
    'react',
    // 'react-hooks',
    // 'import',
    'prettier',
    'jsx-a11y',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'off',
    'jsx-a11y/no-autofocus': 'off',
    // 'import/no-unresolved': 'off',
    // 'jsx-a11y/rule-name': 2,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
