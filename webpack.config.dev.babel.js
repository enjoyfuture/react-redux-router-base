const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const appPath = path.resolve(__dirname, 'public');
const nodeModules = path.resolve(__dirname, 'node_modules');

//判断 dll 文件是否已生成
let dllExist = false;
try {
  fs.statSync(path.resolve(appPath, 'dll', 'vendor.dll.js'));
  dllExist = true;
} catch (e) {
  dllExist = false;
}

const webpackConfig = {
  cache: true, //开启缓存,增量编译
  devtool: 'source-map', //生成 source map文件
  resolve: {
    //自动扩展文件后缀名
    extensions: ['.js', '.less', '.png', '.jpg', '.gif'],
    //模块别名定义，方便直接引用别名
    alias: {
      'react-router-redux': path.resolve(nodeModules, 'react-router-redux-fixed/lib/index.js'),
    }
  },

  // 入口文件 让webpack用哪个文件作为项目的入口
  entry: {
    home: ['./client/pages/home/index.js', hotMiddlewareScript],
    about: ['./client/pages/about/index.js', hotMiddlewareScript],
    page1: ['./client/pages/page-1/index.js', hotMiddlewareScript],
    page2: ['./client/pages/page-2/index.js', hotMiddlewareScript],
  },

  // 出口 让webpack把处理完成的文件放在哪里
  output: {
    // 编译输出目录, 不能省略
    path: path.resolve(appPath, 'dist'),
    filename: '[name].js', //文件名称
    publicPath: '/context/dist/' //资源上下文路径
  },

  module: {
    loaders: [
      // https://github.com/MoOx/eslint-loader
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // https://github.com/webpack/url-loader
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        query: {
          name: '[hash].[ext]',
          limit: 10000, // 10kb
        }
      },
      {
        test: /\.(mp4|ogg|eot|woff|ttf|svg)$/,
        loader: 'file-loader',
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader',
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热部署替换模块
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        // eslint 配置
        eslint: {
          emitError: true, // 验证失败，终止
          configFile: '.eslintrc'
        },
      }
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

