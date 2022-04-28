const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
require('dotenv').config()


const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    postcssOptions: {
      plugins: [
        [
          "autoprefixer",
          {
            "overrideBrowserslist": [
              "last 2 version",
              "> 1%",
              "IE 10"
            ]
          },
        ],
      ],
    },
  }
};

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          postcssLoader,
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: "[local]--[hash:base64:5]",
              },
              importLoaders: 1,
            }
          },
          postcssLoader,
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: 'src/styles/resources.scss',
            },
          },
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.REACT_APP_PUBLIC_PATH || '/',
    clean: true,
  },
  devServer: {
    historyApiFallback: true,
    port: process.env.REACT_APP_DEV_SERVER_PORT,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'RooX test task',
      template: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ]
};