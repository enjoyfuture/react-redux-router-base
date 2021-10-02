# node-react-redux-base

## 关于 url 二级路径即上下文 context 的说明

- 有的项目根路径为 '' ，比如 http://xx.xxx.com
- 有的项目根路径为 '/abs' ，比如 http://xx.xxx.com/abs

基础项目中 URL_CONTEXT 设置为 ''，如果实际项目中 URL_CONTEXT 不是 ''，需要修改项目中对应的变量值

- /common/constants.js URL_CONTEXT

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
npm run start:beta # 测试环境
npm run start:prod # 线上环境
```

## 生成上线分支

```
npm run git-branch [branchAlias]
```

branchAlias 为可选参数，用来标示分支名称

## Build

### Development

```
NODE_ENV=development npm run build
```

### Beta

```
NODE_ENV=beta npm run build
```

### production

```
NODE_ENV=production npm run build
```

## 分析每个依赖模块占比，给出优化方案

```
NODE_ENV=production ANALYZE=true npm run build
```

## lint 检测 js 和 css 语法

```
npm run lint
```

### style lint

```
npm run lint:css
```

### javascript lint

```
npm run lint:js
```

## fix 修复不规范的 js 和 css 写法

```
npm run fix
```

### style fix

```
npm run fix:css
```

### javascript lint

```
npm run fix:js
```

### View Css prefix

```bash
npm run css-prefix
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

- ava : 测试框架，类似于 mocha jest jasmine QUnit 等
  官网：https://github.com/avajs/ava
  中文指南：https://github.com/avajs/ava-docs/blob/master/zh_CN/readme.md
- enzyme : React 测试工具，依赖 react-addons-test-utils 可以类似 jquery 风格的 api 操作 react 节点
  官网：https://github.com/airbnb/enzyme
  文档：http://airbnb.io/enzyme/
  http://airbnb.io/enzyme/docs/installation/index.html
- sinon : 提供 fake 数据， 替换函数调用等功能
  官网：http://sinonjs.org/
- nyc : JS code coverage tool that computes statement, line, function and branch coverage（用来检测单元测试覆盖率）
  官网：https://github.com/istanbuljs/nyc
  Note: With this configuration, the Istanbul instrumentation will only be active when NODE_ENV or BABEL_ENV is test.
- nock: 用来模拟 http 请求测试用
  官网：https://github.com/node-nock/nock
- 参考文章
  - http://zhaozhiming.github.io/blog/2016/03/28/use-ava-and-enzyme-to-test-react-component-part1/
  - http://zhaozhiming.github.io/blog/2016/03/29/use-ava-and-enzyme-to-test-react-component-part2/
  - http://zhaozhiming.github.io/blog/2016/03/29/use-ava-and-enzyme-to-test-react-component-part3/

### 关于 sass 的说明

由于私服不能连接外网下载安装 node-sass 过程中需要的文件，故 forked 了包含 node-sass 依赖的包,
重新发布了带 vendor 的 node-sass 和依赖 node-sass 的包，新的依赖包名称对应关系如下

| 官方的依赖             | 加入 vendor 的依赖 | 官方当前版本 |
| ---------------------- | ------------------ | ------------ |
| node-sass              | node-sass-vendor   | 4.9.3        |
| sass-loader-joy-vendor | sass-loader        | 7.1.0        |

注意：如官方有新版本时，可以重新 forked 更新自定义的依赖包

## 项目搭建参考

- https://github.com/notrab/create-react-app-redux

## Issue

https://github.com/joy-web/react-redux-router-base/issues

## Change Log

Please view [here](./CHANGELOG.md)

## 相关参考

- [css module for react](https://github.com/camsong/blog/issues/5)
- [redux 官方例子](https://github.com/reactjs/redux/tree/master/examples)
- [babel 的 polyfill 和 runtime 的区别](https://segmentfault.com/q/1010000005596587?from=singlemessage&isappinstalled=1)
