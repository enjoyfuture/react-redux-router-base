import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import MappingPlugin from 'webpack-mapping-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const appPath = path.resolve(__dirname, 'public');
const nodeModules = path.resolve(__dirname, 'node_modules');

// multiple extract instances
const extractLess = new ExtractTextPlugin({
  filename: 'css/[name].[chunkhash].css',
  allChunks: true
});
const extractCSS = new ExtractTextPlugin({
  filename: 'css/style.[name].[chunkhash].css',
  allChunks: true
});

const webpackConfig = {
  devtool: 'source-map', // 生成 source-map文件 原始源码
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less'],
    //模块别名定义，方便直接引用别名
    alias: {
      'react-router-redux': path.resolve(nodeModules, 'react-router-redux-fixed/lib/index.js'),
    },
    modules: [
      'client',
      'node_modules',
    ],
  },

  entry: {
    home: ['./client/pages/home/index.js'],
    about: ['./client/pages/about/index.js'],
    page1: ['./client/pages/page-1/index.js'],
    page2: ['./client/pages/page-2/index.js'],
    vendor: [
      'react',
      'react-dom'
    ]
  },

  output: {
    path: path.join(appPath, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/context/dist/',
    sourceMapFilename: '[name].map',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // https://github.com/webpack/url-loader
      {
        test: /\.(png|jpg|gif)$/,
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
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader?pack=cleaner'],
          publicPath: '/public/dist'
        })
      },
      {
        test: /\.less/,
        exclude: /node_modules/,
        use: extractLess.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader?pack=cleaner', 'less-loader'],
          publicPath: '/public/dist'
        })
      }
    ],
  },

  plugins: [
    //用来优化生成的代码 chunk,合并相同的代码
    new webpack.optimize.AggressiveMergingPlugin(),
    //用来保证编译过程不出错
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    // https://doc.webpack-china.org/guides/code-splitting-libraries/#manifest-
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      filename: '[name].[chunkhash].js',
    }),
    extractLess,
    extractCSS,
    new MappingPlugin({
      basePath: '/context/dist/',
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        warnings: false,
      },
      mangle: {
        except: [] // 设置不混淆变量名
      }
    }),
    new webpack.BannerPlugin({banner: 'Banner', raw: true, entryOnly: true}),
    new webpack.LoaderOptionsPlugin({
      /*UglifyJsPlugin 不再压缩 loaders。在未来很长一段时间里，需要通过设置 minimize:true 来压缩 loaders。
       loaders 的压缩模式将在 webpack 3 或后续版本中取消。
       为了兼容旧的 loaders，loaders 可以通过插件来切换到压缩模式：*/
      minimize: true,
      options: {
        postcss () {
          return {
            defaults: [precss, autoprefixer],
            cleaner: [autoprefixer({
              flexbox: 'no-2009',
              browsers: ['Chrome >= 35', 'Firefox >= 38', 'Android >= 4.4', 'iOS >=8', 'Safari >= 8']
            })]
          };
        },
      }
    })
  ],
};

export default webpackConfig;
