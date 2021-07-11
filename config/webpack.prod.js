const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.common')

function resolve(...args) {
  return path.resolve(__dirname, ...args)
}

const webpackProdConfig = {
  output: {
    publicPath: '/',
    path: resolve('../dist'),
    filename: 'js/[name].[chunkhash:6].js',
    chunkFilename: 'js/[name].[chunkhash:6].js',
    assetModuleFilename: 'img/[name].[hash:6][ext]',
    clean: true,
  },
  devtool: false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        exclude: /node_modules/,
      }),
    ],
  },
}

module.exports = merge(webpackBaseConfig, webpackProdConfig)
