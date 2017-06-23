# node-react-redux-base

## 关于 url 二级路径即上下文 context 的说明

* 有的项目根路径为 '' ，比如 http://ft.jd.com
* 有的项目根路径为 '/abs' ，比如 http://ft.jd.com/abs

基础项目中 context 设置为 '/context'，如果实际项目中 context 是 '' 或其他值，需要修改项目中对应的变量值

* /client/utils/config.js     context
* /server/config/beta/index.js   URL_CONTEXT
* /server/config/beta/index.js   URL_CONTEXT
* /server/config/beta/index.js   URL_CONTEXT
* webpack.config.dev.babel.js    context
* webpack.config.prod.babel.js   context 

## Server 

### generate dll file

At first, generate dll file. You need to exec the following command.

```
npm run dll
```

### start server

```
npm start
```

### start server after build

```
npm run start:prod
```

## Build

### Development

```
NODE_ENV=development npm run build
```

### Beta

```
NODE_ENV=beta npm run build
```

### product

```
NODE_ENV=product npm run build
```

## Unit Test

### Test
```
npm test
```

If you writ unit test incremental, you should use the following command, it will save compile time.

### Test Watch
```
npm run test-watch
```

### 检查单元测试的覆盖度
```
npm run check-coverage
```

说明，用来查看测试通过率，后面的参数值可以修改，分别是表达式，条件分支，函数，行数 百分比
```
"check-coverage": "nyc check-coverage --statements 100 --branches 100 --functions 100 --lines 100"
```


## Unit Test Frame

* ava : 测试框架，类似于 mocha jest jasmine QUnit 等
  官网：https://github.com/avajs/ava
  中文指南：https://github.com/avajs/ava-docs/blob/master/zh_CN/readme.md
* enzyme : React测试工具，依赖 react-addons-test-utils 可以类似 jquery 风格的 api 操作react 节点
  官网：https://github.com/airbnb/enzyme
  文档：http://airbnb.io/enzyme/
* sinon : 提供 fake 数据， 替换函数调用等功能
  官网：http://sinonjs.org/
* nyc : JS code coverage tool that computes statement, line, function and branch coverage（用来检测单元测试覆盖率）
  官网：https://github.com/istanbuljs/nyc
  Note: With this configuration, the Istanbul instrumentation will only be active when NODE_ENV or BABEL_ENV is test.
* nock: 用来模拟 http 请求测试用
  官网：https://github.com/node-nock/nock
* 参考文章
  * http://zhaozhiming.github.io/blog/2016/03/28/use-ava-and-enzyme-to-test-react-component-part1/
  * http://zhaozhiming.github.io/blog/2016/03/29/use-ava-and-enzyme-to-test-react-component-part2/
  * http://zhaozhiming.github.io/blog/2016/03/29/use-ava-and-enzyme-to-test-react-component-part3/

## Development explain

* shortcut key: control + h , open DevTool panel
* shortcut key: control + w , change DevTool panel position

## Issue

https://github.com/joy-web/react-redux-router-base/issues

## Change Log

Please view [here](./CHANGELOG.md)

## 相关参考

* [css module for react](https://github.com/camsong/blog/issues/5)
