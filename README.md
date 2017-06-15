# node-react-redux-base

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
npm startProd
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
npm run test
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
* npm 私服地址 http://10.13.8.25:7002/

## support IE8

We need to add the following files in html page.

* 修改 redux 和 react-redux, 去掉目录 es (需要解决不用 jsnext)
* 修改 react-dom 下 SimpleEventPlugin.js，字符串不支持[i]取值，换成 substring(i, i+1)处理

* 增加 es5-shim.min.js 和 es5-sham.min.js 支持 es5新的方法和属性
* 增加 respond.min.js 兼容响应式布局
* 增加 html5shiv.min.js 兼容 html5 新的标签和属性
* 增加 fetch-ie8 兼容 ie8 fetch
* 增加 console.js 兼容 ie8 console
* 增加 es5-sham-ie8.js 主要解决 ie8 下 defineProperty支持性问题
* 增加 ie8-eventlistener.js 让 ie8 也支持标准事件方法
* 样式的兼容
* 关于 ie8 支持可以查看 https://github.com/xcatliu/react-ie8

## 增加统一日志接入

* [日志接入申请参考](http://wiki.cbpmgt.com/confluence/pages/viewpage.action?pageId=20397586)
* [日志查看-测试环境](http://172.24.5.75:8083/search)
* [日志查看-线上环境](http://digger.jd.com/search)
* [日志配置说明](http://wiki.cbpmgt.com/confluence/pages/viewpage.action?pageId=17028373)

注意事项: 配置的日志路径名称应该跟立项创建的应用名称相统一，这样系统会自动检测的，而不需要手工配置

日志文件全路径 /export/log/xxx/xxx.log

## Issue

http://gitlab.cbpmgt.com/fe-team/node-react-redux-base/issues

## Change Log

Please view [here](./CHANGELOG.md)
