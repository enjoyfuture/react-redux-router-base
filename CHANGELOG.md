# node-react-redux-base 更新日志

## version 0.4.0 

* 修改 webpack 配置文件，加入 babel-polyfill
* 去掉 es6-promise，交由 babel-polyfill 处理
* 修改 css-loader 模块化配置，修改为可混淆的 css 变量命名
* 修改 sass 相关包，改成 node-sass-vendor sass-loader-joy-vendor sass-true-vendor sasslint-loader-vendor 
  确保每次编译不再下载 node zip 包

## version 0.3.0 

* Upgrade react-transition-group to 2.2.0 and modified the animation demo
* 关于 url 二级路径即上下文 context 配置项，只需要修改两处即可，一是 server 端的 config，另一个是 webpack.build.babel.js
* npm dependencies 升级更新
* 引入 resolve-url-loader 解决编译 sass url 不能正确解析

## version 0.2.0 

* 采用 css module 搭建基础平台
* 升级 webpack 并修改对应的代码
* 改为 sass 并利用 sass-lint 规范书写格式

## version 0.1.0  开启 node-react-redux-base 之旅

* 构建基于 React Router Redux 项目框架


