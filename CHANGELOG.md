# node-react-redux-base 更新日志

## futures

- 引入简化版 immutable.js
- 采用 axios 来发送请求
- 加入 react-hot-loader 支持

## version 0.12.0 (2018-09-11)

- 升级 babel 到 7
  执行命令 `npx babel-upgrade --write` 完成 node_modules 和 .babelrc 升级，其他需要手动调整升级
  - https://babeljs.io/docs/en/v7-migration
  - https://github.com/babel/babel-upgrade
- 更新 AVA 单元测试到 1.0.0 beta 版，并给出相关单元测试
- 重新整理 stylelint
- 打包构建后的 css 改为只生成一个，这样只需第一次加载 css，体验会更好一点

## version 0.11.0 (2018-06-18)

- 基于 saga 来构建基础平台脚手架
- 增加了生成上线分支脚本 `npm run git-branch [branchAlias] 详见 README.md 说明`
- 增加了检测 css 前缀脚本 `npm run css-prefix`
- 去掉了 pre-commit 改用 lint-staged 来检测 js 和 css 代码

- 遗留的问题： url 需要判断是否有前缀，切换路由时缓存数据，全局 loading 的处理等
- 单元测试待补齐

## version 0.10.0 (2018-04-08)

- Webpack 升级到 4.x 升级参考以下文章
  - https://juejin.im/post/5ac9b7165188255cb32e66cc
  - [官方例子](https://github.com/webpack/webpack/tree/master/examples)
  - https://blog.csdn.net/qq_16559905/article/details/79404173
  - 源代码：webpack/lib/WebpackOptionsApply.js
  - https://blog.zfanw.com/webpack-tutorial
  - https://reacttraining.com/react-router/web/guides/code-splitting
  - https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
- 改用 mini-css-extract-plugin 替换 extract-text-webpack-plugin，完美解决不兼容 webpack 4 的问题
- 去掉 sass-lint ，改为 stylelint 来检测样式
- 升级 react-router 到 4.x，升级 redux 为 4.x
- 引入 import 按需加载代码实现
- 引入 redux api 中间件，只需一个方法搞定原先需要三个方法实现的 fetch 请求
- 加入全局 loading 和 toast 提示效果，业务中不需要再单独处理
- 支持 es7 注解（装饰器）写法
- 引入 react-immutable-pure-decorator，性能优化杀手
- server 端 helper utils.js 中增加了两个方法 fileDownloadStream 和 fileUploadStream，对应文件下载和上传
- server 端给出合并请求写法，包括同步和异步请求多个接口，并增加了 wrapData，用来处理包裹多接口返回的数据
- 升级后重写例子代码
- 加入了 lint 和 fix 命令 `npm run lint` `npm run fix`
- 引入 npm 包 pre-commit ，当 `git commit` 提交代码时，会执行 pre-commit 中的命令来检测代码的规范化写法

## version 0.9.1 (2018-03-08)

- 给出上传文件和下载文件的例子
- 增加 h5 例子

## version 0.9.0 (2018-01-09)

- 调整项目目录结构，新增 scripts 目录
- webpack 配置优化，启用 cssnano
- 加入 import()动态分包机制

## version 0.8.0 (2017-12-29)

- 使用样式库 perfect-css 重写了页面
- 优化了部分代码功能
- 调整了单元测试

## version 0.7.0 (2017-12-06)

- 加入错误监控脚本
- 加入数据平台脚本
- webpack 持久化缓存优化 https://github.com/pigcan/blog/issues/9
- 添加了插件 BannerPlugin
- 用 webpack-manifest-plugin 替换插件 webpack-mapping-plugin

## version 0.6.0 (2017-10-30)

- 用 babel-preset-env 替换 babel-preset-2015
- 修改了 server 端 config 配置，增加了 base.js 基础配置
- api url 统一放在 api-url 文件夹下，方便分类管理
- 修改了 urlContext，统一改为 server 端设置，client 用到时从 server 端读取
- react 升级到 v16.0.0 以及其他 npm 依赖升级
- 在 App.js 中加入了 react 16 中的方法 componentDidCatch 用来捕获异常
- eruda 在测试环境中采用导入的方式注入
- scss 编译时，对于公共的 scss 文件改成不使用 css module，其他组件中使用的 scss 采用 css module 方式
- 调整单元测试代码
- 引入了前端异常监控脚本
- 新增 util session-storage.js 用来处理 sessionStorage
- 其他 bug 和优化处理

## version 0.5.0 (2017-9-6)

- 加入移动端动态调整根字体大小
- 加入移动端调试插件 eruda
- 加入全局异常监听 window.onerror，当页面发生错误时，往服务端发送错误请求
- Router 给出 onEnter 和 onLeave 例子
- 生产环境由 product 修改为 production
- 修改 .babelrc 配置 bug

## version 0.4.0 (2017-8-18)

- 修改 webpack 配置文件，加入 babel-polyfill
- 去掉 es6-promise，交由 babel-polyfill 处理
- 修改 css-loader 模块化配置，修改为可混淆的 css 变量命名
- 修改 sass 相关包，改成 node-sass-vendor sass-loader-joy-vendor sass-true-vendor sasslint-loader-vendor
  确保每次编译不再下载 node zip 包

## version 0.3.0 (2017-6-30)

- Upgrade react-transition-group to 2.2.0 and modified the animation demo
- 关于 url 二级路径即上下文 context 配置项，只需要修改两处即可，一是 server 端的 config，另一个是 webpack.build.babel.js
- npm dependencies 升级更新
- 引入 resolve-url-loader 解决编译 sass url 不能正确解析

## version 0.2.0 (2017-6-15)

- 采用 css module 搭建基础平台
- 升级 webpack 并修改对应的代码
- 改为 sass 并利用 sass-lint 规范书写格式

## version 0.1.0 开启 node-react-redux-base 之旅 (2016-10-27)

- 构建基于 React Router Redux 项目框架
