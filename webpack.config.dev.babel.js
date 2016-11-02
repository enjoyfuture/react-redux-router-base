const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const appPath = path.resolve(__dirname, 'public');

const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

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
  stats: {
    colors: true, //打印日志显示颜色
    reasons: true //打印相关模块被引入
  },
  resolve: {
    //自动扩展文件后缀名
    extensions: ['.js', '.jsx', '.less', '.json'],
  },

  // 入口文件 让webpack用哪个文件作为项目的入口
  entry: {
    index: ['./client/pages/home/index.js', hotMiddlewareScript],
    about: ['./client/pages/about/index.js', hotMiddlewareScript],
    person: ['./client/pages/person/index.js', hotMiddlewareScript]
  },

  // 出口 让webpack把处理完成的文件放在哪里
  output: {
    // 编译输出目录, 不能省略
    path: path.resolve(appPath, 'dist'),
    filename: '[name].bundle.js', //文件名称
    publicPath: '/dist/' //资源路径
  },

  module: {
    loaders: [
      // https://github.com/MoOx/eslint-loader
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        exclude: /node_modules/,
      },
      // https://github.com/webpack/url-loader
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url',
        query: {
          name: '[hash].[ext]',
          limit: 10000, // 10kb
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]!postcss-loader?pack=cleaner',
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]!postcss-loader?pack=cleaner!less-loader',
      },
      {
        test: /\.(mp4|ogg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热部署替换模块
    new webpack.NoErrorsPlugin(),
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
        postcss () {
          return {
            defaults: [precss, autoprefixer],
            cleaner: [autoprefixer({
              browsers: ['Chrome >= 35', 'Firefox >= 38', 'Edge >= 12',
                'Explorer >= 8', 'Android >= 4.3', 'iOS >=8', 'Safari >= 8']
            })]
          };
        },
      }
    })
  ]
};


//创建 HtmlWebpackPlugin 的实例
// https://www.npmjs.com/package/html-webpack-plugin
const entry = webpackConfig.entry;

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
// 为 HtmlwebpackPlugin 设置配置项，与 entry 键对应，根据需要设置其参数值
const htmlwebpackPluginConfig = {
  index: {
    title: 'Node Demo'
  },
  about: {
    title: 'Node Demo - About'
  },
  person: {
    title: 'Node Demo - Person'
  }
};

for (const key in entry) {
  if (entry.hasOwnProperty(key)) {
    webpackConfig.plugins.push(
      new HtmlwebpackPlugin({
        title: htmlwebpackPluginConfig[key].title,
        template: path.resolve(__dirname, 'server/templates/layout-dev.html'),
        filename: path.resolve(__dirname, 'server/views', `${key}.hbs`),
        //chunks这个参数告诉插件要引用entry里面的哪几个入口
        chunks: [key],
        //要把script插入到标签里
        inject: 'body'
      })
    );
  }
}

module.exports = webpackConfig;

