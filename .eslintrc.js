/*
 * @Author: jweboy
 * @Date: 2019-12-03 16:18:35
 * @LastEditors: jweboy
 * @LastEditTime: 2022-01-25 11:43:50
 */
/**
 * @name 常规代码规则，
 * @url 采用 `eslint` 和 `airbnb` 的基础规则
 * 1. `airbnb` 基准规则 https://github.com/airbnb/javascript
 * 2. `eslint` 基准规则 https://cn.eslint.org/docs/rules
 * @description 规则数值含义
 * "off" 或 0 - 关闭规则
 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
 */

module.exports = {
  extends: [
    'eslint:recommended', // `eslint` 基准规则
    'airbnb-base', // `airbnb` 基准规则
    'prettier',
  ],
  parser: '@typescript-eslint/parser', // 解析器
  plugins: [
    'prettier',
  ],
  env: {
    es6: true, // 启用除了 `modules` 以外的所有 `ECMAScript 6` 特性（该选项会自动设置 `ecmaVersion` 解析器选项为 6）
    node: true, // `Node.js` 全局变量和 `Node.js` 作用域
  },
  parserOptions: {
    ecmaVersion: 6, // Allows the use of modern ECMAScript features
    sourceType: 'module', // `ECMAScript` 模块
    ecmaFeatures: {
      experimentalObjectRestSpread: true, // 对象剩余参数解构
      modules: true
    },
  },
  rules: {
    'prettier/prettier': ['error'], // 遵循 `.prettirc.js` 相关规则
    'no-console': 1,
    "no-unused-vars": 0, // 未使用变量声明
    'no-unused-expressions': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-shadow': 0,
    'no-underscore-dangle': 0, //
    'import/no-extraneous-dependencies': 0,
    camelcase: 0,
  }
};
