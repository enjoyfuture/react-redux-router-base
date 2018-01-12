import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import autoprefixer from 'autoprefixer';
import flexbugs from 'postcss-flexbugs-fixes'; // 修复 flexbox 已知的 bug
import Webpack2Polyfill from 'webpack2-polyfill-plugin';

const cssnano = require('cssnano'); // 优化 css，对于长格式优化成短格式等
import incstr from 'incstr';
// 根目录上下文
import { urlContext } from '../client/utils/config';

const appRoot = path.resolve(__dirname, '../');
const appPath = path.resolve(appRoot, 'public');
const nodeModules = path.resolve(__dirname, '../node_modules');

// PC 端 browsers: ['Explorer >= 9', 'Edge >= 12', 'Chrome >= 49', 'Firefox >= 55', 'Safari >= 9.1']
// 手机端 browsers: ['Android >= 4.4', 'iOS >=9']
const browsers = ['Android >= 4.4', 'iOS >=9'];

// 混淆 css 变量名
const createUniqueIdGenerator = () => {
  const index = {};

  const generateNextId = incstr.idGenerator({
    // Removed "d" letter to avoid accidental "ad" construct.
    // @see https://medium.com/@mbrevda/just-make-sure-ad-isnt-being-used-as-a-class-name-prefix-or-you-might-suffer-the-wrath-of-the-558d65502793
    alphabet: 'abcefghijklmnopqrstuvwxyz0123456789_',
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

    index[name] = nextId;

    return index[name];
  };
};

const uniqueIdGenerator = createUniqueIdGenerator();

const generateScopedName = (localName, resourcePath) => {
  const componentName = resourcePath.split('/').slice(-2, -1);
  return uniqueIdGenerator(`${componentName}_${localName}`);
};

// scss config
function scssConfig(modules) {
  // 在 css-loader 中加入 sourceMap: true，可能会引起编译报错，比如 content: $font; 会编译报错
  return extractScss.extract({
    fallback: 'style-loader',
    use: [{
      loader: 'css-loader',
      options: modules ? {
        sourceMap: true,
        modules: true,
        minimize: true,
        localIdentName: '[local][contenthash:base64:5]',
        getLocalIdent: (context, localIdentName, localName) => {
          // FIXME 这样每次打包编译时，混淆的 css 名导致无法缓存，待解决实现
          return generateScopedName(localName, context.resourcePath);
        },
      } : {
        sourceMap: true,
        minimize: true,
      },
    }, {
      // Webpack loader that resolves relative paths in url() statements
      // based on the original source file
      loader: 'resolve-url-loader',
    }, {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        plugins: [
          cssnano({
            autoprefixer: false
          }),
          flexbugs(),
          autoprefixer({
            flexbox: 'no-2009',
            browsers,
          }),
        ],
      },
    }, {
      loader: 'sass-loader-joy-vendor', options: {
        sourceMap: true, // 必须保留
        modules,
        outputStyle: 'compressed', // 压缩
        precision: 15, // 设置小数精度
      },
    }],
  });
}

// multiple extract instances
const extractScss = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash:8].css',
  allChunks: true,
  ignoreOrder: true,
});
const extractCSS = new ExtractTextPlugin({
  filename: 'css/style.[name].[contenthash:8].css',
  allChunks: true,
});

// 基于 webpack 的持久化缓存方案 可以参考 https://github.com/pigcan/blog/issues/9
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
      'react',
      'react-dom',
    ],
  },

  // 出口 让webpack把处理完成的文件放在哪里
  output: {
    path: path.join(appPath, 'dist'),
    filename: '[name].[chunkhash:8].js',
    publicPath: `${urlContext}/dist/`,
    sourceMapFilename: 'map/[file].map',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            cacheDirectory: true,
            presets: [
              'react', 'stage-3', ['env', {
                modules: false,
                targets: {
                  browsers
                },
                useBuiltIns: true,
              }],
            ],
            plugins: [
              'syntax-dynamic-import', //支持'import()'
              'transform-class-properties', //解析类属性，静态和实例的属性
              'transform-object-assign', //polyfill object-assign
              [
                'transform-react-remove-prop-types',
                {
                  mode: 'remove', // 默认值为 remove ，即删除 PropTypes
                  removeImport: true, // the import statements are removed as well. import PropTypes from 'prop-types'
                  ignoreFilenames: ['node_modules']
                }
              ]
            ]
          }
        },
      },
      // https://github.com/webpack/url-loader
      {
        test: /\.(png|jpe?g|gif)/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[hash:8].[ext]',
            limit: 8192, // 8kb
          },
        },
      },
      {
        test: /\.(mp4|ogg|eot|woff|ttf|svg)$/,
        use: 'file-loader',
      },
      // css 一般都是从第三方库中引入，故不需要 CSS 模块化处理
      {
        test: /\.css/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: true,
            },
          }, {
            // Webpack loader that resolves relative paths in url() statements
            // based on the original source file
            loader: 'resolve-url-loader',
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                cssnano({
                  autoprefixer: false
                }),
                flexbugs(),
                autoprefixer({
                  flexbox: 'no-2009',
                  browsers,
                }),
              ],
            },
          }],
          // publicPath: '/public/dist/' 这里如设置会覆盖 output 中的 publicPath
        }),
      },
      // 为了减少编译生产的 css 文件大小，公共的 scss 不使用 css 模块化
      {
        test: /\.scss/,
        include: path.resolve(appRoot, './client/scss/perfect.scss'),
        use: scssConfig(false),
      },
      {
        test: /\.scss/,
        exclude: path.resolve(appRoot, './client/scss/perfect.scss'),
        use: scssConfig(true),
      },
    ],
  },

  plugins: [
    new Webpack2Polyfill(),
    new webpack.NoEmitOnErrorsPlugin(),
    // 用来优化生成的代码 chunk，合并相同的代码
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin({// Scope Hoisting-作用域提升
      // 检查所有的模块
      maxModules: Infinity,
      // 将显示绑定失败的原因
      optimizationBailout: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    extractScss,
    extractCSS,
    // 以下两个插件可以解决持久化缓存，但由于用到了模块化，混淆的 css 名导致无法缓存
    // 故先注释掉，待后续解决了，再打开，或者不使用 css Module 时
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedChunksPlugin(),
    // https://doc.webpack-china.org/guides/code-splitting-libraries/#manifest-
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    new ManifestPlugin({
      basePath: `${urlContext}/dist/`,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        warnings: false,
        /*eslint-disable camelcase*/
        drop_console: process.env.NODE_ENV === 'production' // 只有正式环境去掉 console
      },
      mangle: {
        except: [] // 设置不混淆变量名
      },
    }),
    new webpack.BannerPlugin({
      banner: [
        '/*!',
        ' react-redux-router-base',
        ` Copyright © 2017-${new Date().getFullYear()} JD Finance.`,
        '*/',
      ].join('\n'),
      raw: true,
      entryOnly: true,
    }),
    new webpack.LoaderOptionsPlugin({
      /*UglifyJsPlugin 不再压缩 loaders。在未来很长一段时间里，需要通过设置 minimize:true 来压缩 loaders。
       loaders 的压缩模式将在 webpack 3 或后续版本中取消。
       为了兼容旧的 loaders，loaders 可以通过插件来切换到压缩模式：*/
      minimize: true,
    }),
  ],
};

export default webpackConfig;
