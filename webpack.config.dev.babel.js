const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const flexbugs = require('postcss-flexbugs-fixes'); // 修复 flexbox 已知的 bug
//const cssnano = require('cssnano'); // 优化 css，对于长格式优化成短格式等
const autoprefixer = require('autoprefixer');

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const appPath = path.resolve(__dirname, 'public');
const nodeModules = path.resolve(__dirname, 'node_modules');

// 定义根目录上下文，因为有的项目是用二级路径区分的，
// 如果没有二级路径区分，可以设为 '', 如 http://ft.jd.com
const context = process.env.URL_CONTEXT;

// 判断 dll 文件是否已生成
let dllExist = false;
try {
  fs.statSync(path.resolve(appPath, 'dll', 'vendor.dll.js'));
  dllExist = true;
} catch (e) {
  dllExist = false;
}

const webpackConfig = {
  cache: true, // 开启缓存,增量编译
  devtool: 'eval-source-map', // 生成 source map文件
  target: 'web', // webpack 能够为多种环境构建编译, 默认是 'web'，可省略 https://doc.webpack-china.org/configuration/target/
  resolve: {
    // 自动扩展文件后缀名
    extensions: ['.js', '.scss', '.css', '.png', '.jpg', '.gif'],
    // 模块别名定义，方便直接引用别名
    alias: {
      'react-router-redux': path.resolve(nodeModules, 'react-router-redux-fixed/lib/index.js'),
    },
    // 参与编译的文件
    modules: [
      'client',
      'node_modules',
    ],
  },

  // 入口文件 让webpack用哪个文件作为项目的入口
  entry: {
    home: ['babel-polyfill', './client/pages/home/index.js', hotMiddlewareScript],
    about: ['babel-polyfill', './client/pages/about/index.js', hotMiddlewareScript],
    page1: ['babel-polyfill', './client/pages/page-1/index.js', hotMiddlewareScript],
    page2: ['babel-polyfill', './client/pages/page-2/index.js', hotMiddlewareScript],
  },

  // 出口 让webpack把处理完成的文件放在哪里
  output: {
    // 编译输出目录, 不能省略
    path: path.resolve(appPath, 'dist'), // 打包输出目录（必选项）
    filename: '[name].bundle.js', // 文件名称
    // 资源上下文路径，可以设置为 cdn 路径，比如 publicPath: 'http://cdn.example.com/assets/[hash]/'
    publicPath: `${context}/dist/`,
  },

  module: {
    rules: [
      // https://github.com/MoOx/eslint-loader
      {
        enforce: 'pre',
        test: /\.js$/,
        include: /client/,
        use: {
          loader: 'eslint-loader',
          options: {
            configFile: '.eslintrc.js',
            emitError: true, // 验证失败，终止
          }
        }
      },
      {
        enforce: 'pre',
        test: /\.scss/,
        exclude: /node_modules/,
        use: {
          loader: 'sasslint-loader-vendor',
          options: {
            configFile: '.sass-lint.yml',
            emitError: false,
            failOnWarning: false
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      // https://github.com/webpack/url-loader
      {
        test: /\.(png|jpe?g|gif)/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[hash].[ext]',
            limit: 10000, // 10kb
          }
        }
      },
      {
        test: /\.(mp4|ogg|eot|woff|ttf|svg)$/,
        use: 'file-loader',
      },
      {
        test: /\.css/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: true,
            // localIdentName: '[name]__[local]__[hash:base64:5]',
            getLocalIdent: (context, localIdentName, localName, options) => {
              return `${context.resourcePath.split('/').slice(-2, -1)}-${localName}`;
            }
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: [
              //cssnano(),
              flexbugs(),
              autoprefixer({
                //flexbox: 'no-2009',
                browsers: ['Explorer >= 9', 'Edge >= 12', 'Chrome >= 45', 'Firefox >= 38',
                  'Android >= 4.4', 'iOS >=8', 'Safari >= 9']
              })
            ]
          }
        }],
      },
      {
        test: /\.scss/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: true,
            //localIdentName: '[name]__[local]__[hash:base64:5]',
            getLocalIdent: (context, localIdentName, localName, options) => {
              return `${context.resourcePath.split('/').slice(-2, -1)}-${localName}`;
            }
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: [
              //cssnano(),
              flexbugs(),
              autoprefixer({
                //flexbox: 'no-2009',
                browsers: ['Explorer >= 9', 'Edge >= 12', 'Chrome >= 45', 'Firefox >= 38',
                  'Android >= 4.4', 'iOS >=8', 'Safari >= 9']
              })
            ]
          }
        }, {
          // Webpack loader that resolves relative paths in url() statements
          // based on the original source file
          loader: 'resolve-url-loader',
        }, {
          loader: 'sass-loader-joy-vendor',
          options: {
            sourceMap: true, // 必须保留
            outputStyle: 'expanded',
          }
        }],
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热部署替换模块
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(), // Scope Hoisting-作用域提升
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        URL_CONTEXT: JSON.stringify(process.env.URL_CONTEXT), // 使用环境变量
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    })
  ]
};

if (dllExist) {
  webpackConfig.plugins.push(
    new webpack.DllReferencePlugin({
      context: __dirname,
      /**
       * 在这里引入 manifest 文件
       */
      manifest: require('./public/dll/vendor-manifest.json')
    })
  );
}

module.exports = webpackConfig;

