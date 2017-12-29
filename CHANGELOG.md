# node-react-redux-base 更新日志

## version 0.8.0 (2017-12-29)

* 使用样式库 perfect-css 重写了页面
* 优化了部分代码功能
* 调整了单元测试

## version 0.7.0 (2017-12-06)

* 加入错误监控脚本
* 加入数据平台脚本
* webpack 持久化缓存优化 https://github.com/pigcan/blog/issues/9
* 添加了插件 BannerPlugin
* 用 webpack-manifest-plugin 替换插件 webpack-mapping-plugin

## version 0.6.0 (2017-10-30)

* 用 babel-preset-env 替换 babel-preset-2015
* 修改了 server 端 config 配置，增加了 base.js 基础配置
* api url 统一放在 api-url 文件夹下，方便分类管理
* 修改了 urlContext，统一改为 server 端设置，client 用到时从 server 端读取
* react 升级到 v16.0.0 以及其他 npm 依赖升级
* 在 App.js 中加入了 react 16 中的方法 componentDidCatch 用来捕获异常
* eruda 在测试环境中采用导入的方式注入
* scss 编译时，对于公共的 scss 文件改成不使用 css module，其他组件中使用的 scss 采用 css module 方式
* 调整单元测试代码
* 引入了前端异常监控脚本
* 新增 util session-storage.js 用来处理 sessionStorage
* 其他 bug 和优化处理

## version 0.5.0 (2017-9-6)

* 加入移动端动态调整根字体大小
* 加入移动端调试插件 eruda
* 加入全局异常监听 window.onerror，当页面发生错误时，往服务端发送错误请求
* Router 给出 onEnter 和 onLeave 例子
* 生产环境由 product 修改为 production 
* 修改 .babelrc 配置 bug

## version 0.4.0 (2017-8-18)

* 修改 webpack 配置文件，加入 babel-polyfill
* 去掉 es6-promise，交由 babel-polyfill 处理
* 修改 css-loader 模块化配置，修改为可混淆的 css 变量命名
* 修改 sass 相关包，改成 node-sass-vendor sass-loader-joy-vendor sass-true-vendor sasslint-loader-vendor 
  确保每次编译不再下载 node zip 包

## version 0.3.0 (2017-6-30)

* Upgrade react-transition-group to 2.2.0 and modified the animation demo
* 关于 url 二级路径即上下文 context 配置项，只需要修改两处即可，一是 server 端的 config，另一个是 webpack.build.babel.js
* npm dependencies 升级更新
* 引入 resolve-url-loader 解决编译 sass url 不能正确解析

## version 0.2.0 (2017-6-15)

* 采用 css module 搭建基础平台
* 升级 webpack 并修改对应的代码
* 改为 sass 并利用 sass-lint 规范书写格式

## version 0.1.0  开启 node-react-redux-base 之旅  (2016-10-27)

* 构建基于 React Router Redux 项目框架


