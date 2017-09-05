import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import MappingPlugin from 'webpack-mapping-plugin';
import autoprefixer from 'autoprefixer';
const flexbugs = require('postcss-flexbugs-fixes'); // 修复 flexbox 已知的 bug
const cssnano = require('cssnano'); // 优化 css，对于长格式优化成短格式等
import incstr from 'incstr';

const appPath = path.resolve(__dirname, 'public');
const nodeModules = path.resolve(__dirname, 'node_modules');

// 定义根目录上下文，因为有的项目是用二级路径区分的，
// 如果没有二级路径区分，可以设为 '', 如 http://ft.jd.com
const context = process.env.URL_CONTEXT;

// 混淆 css 变量名
const createUniqueIdGenerator = () => {
  const index = {};

  const generateNextId = incstr.idGenerator({
    // Removed "d" letter to avoid accidental "ad" construct.
    // @see https://medium.com/@mbrevda/just-make-sure-ad-isnt-being-used-as-a-class-name-prefix-or-you-might-suffer-the-wrath-of-the-558d65502793
    alphabet: 'abcefghijklmnopqrstuvwxyz0123456789'
  });

  return (name) => {
    if (index[name]) {
      return index[name];
    }

    let nextId;

    do {
      // Class name cannot start with a number.
      nextId = generateNextId();
    } while (/^[0-9]/.test(nextId));

    index[name] = generateNextId();

    return index[name];
  };
};

const uniqueIdGenerator = createUniqueIdGenerator();

const generateScopedName = (localName, resourcePath) => {
  const componentName = resourcePath.split('/').slice(-2, -1);

  return `${uniqueIdGenerator(componentName)}_${uniqueIdGenerator(localName)}`;
};

// multiple extract instances
const extractScss = new ExtractTextPlugin({
  filename: 'css/[name].[chunkhash].css',
  allChunks: true,
  ignoreOrder: true
});
const extractCSS = new ExtractTextPlugin({
  filename: 'css/style.[name].[chunkhash].css',
  allChunks: true
});

const webpackConfig = {
  devtool: 'source-map', // 生成 source-map文件 原始源码
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
    home: ['./client/pages/home/index.js'],
    about: ['./client/pages/about/index.js'],
    page1: ['./client/pages/page-1/index.js'],
    page2: ['./client/pages/page-2/index.js'],
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom'
    ]
  },

  // 出口 让webpack把处理完成的文件放在哪里
  output: {
    path: path.join(appPath, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: `${context}/dist/`,
    sourceMapFilename: 'map/[file].map',
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
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: true,
              modules: true,
              localIdentName: '[local][hash:base64:5]',
              getLocalIdent: (context, localIdentName, localName) => {
                return generateScopedName(localName, context.resourcePath);
              }
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                cssnano(),
                flexbugs(),
                autoprefixer({
                  // flexbox: 'no-2009',
                  browsers: ['Explorer >= 9', 'Edge >= 12', 'Chrome >= 45', 'Firefox >= 38',
                    'Android >= 4.4', 'iOS >=8', 'Safari >= 9']
                })
              ]
            }
          }],
          // publicPath: '/public/dist/' 这里如设置会覆盖 output 中的 publicPath
        })
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        use: extractScss.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: true,
              modules: true,
              localIdentName: '[local][hash:base64:5]',
              getLocalIdent: (context, localIdentName, localName) => {
                return generateScopedName(localName, context.resourcePath);
              }
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                cssnano(),
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
            loader: 'sass-loader-joy-vendor', options: {
              sourceMap: true,
              outputStyle: 'compressed'
            }
          }],
        })
      }
    ],
  },

  plugins: [
    //用来优化生成的代码 chunk,合并相同的代码
    new webpack.optimize.AggressiveMergingPlugin(),
    //用来保证编译过程不出错
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(), // Scope Hoisting-作用域提升
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        URL_CONTEXT: JSON.stringify(process.env.URL_CONTEXT), // 使用环境变量
      }
    }),
    // https://doc.webpack-china.org/guides/code-splitting-libraries/#manifest-
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      filename: '[name].[chunkhash].js',
    }),
    extractScss,
    extractCSS,
    new MappingPlugin({
      basePath: `${context}/dist/`,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        warnings: false,
        /*eslint-disable camelcase*/
        drop_console: true
      },
      mangle: {
        except: [] // 设置不混淆变量名
      }
    }),
    // new webpack.BannerPlugin({banner: 'Banner', raw: true, entryOnly: true}),
    new webpack.LoaderOptionsPlugin({
      /*UglifyJsPlugin 不再压缩 loaders。在未来很长一段时间里，需要通过设置 minimize:true 来压缩 loaders。
       loaders 的压缩模式将在 webpack 3 或后续版本中取消。
       为了兼容旧的 loaders，loaders 可以通过插件来切换到压缩模式：*/
      minimize: true,
    })
  ],
};

export default webpackConfig;
