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
  devtool: 'cheap-source-map',
  entry: {
    page1: ['./client/pages/page-1/index.js'],
    vendor1: [
      'react',
      'react-dom'
    ],
    vendor2: [
      'redux',
      'redux-thunk',
      'react-redux',
      'react-router',
      'react-router-redux-fixed',
      'isomorphic-fetch',
      'classnames',
      'immutable',
      'redux-immutable',
      'es6-promise'
    ]
  },

  output: {
    path: path.join(appPath, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/context/dist/',
  },

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

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
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
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!postcss-loader?pack=cleaner'
        })
      },
      {
        test: /\.less/,
        exclude: /node_modules/,
        loader: extractLess.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!postcss-loader?pack=cleaner!less-loader'
        })
      }
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.CommonsChunkPlugin([{
      name: 'vendor1',
      filename: '[name].[chunkhash].js',
    }, {
      name: 'vendor2',
      filename: '[name].[chunkhash].js',
    }]),
    extractLess,
    extractCSS,
    new MappingPlugin({
      basePath: '/',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
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
  ],
};

export default webpackConfig;