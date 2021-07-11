const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.common')

function resolve(...args) {
  return path.resolve(__dirname, ...args)
}

const webpackDevConfig = {
  output: {
    publicPath: '/',
    path: resolve('../dist'),
    filename: 'js/[name].js',
    clean: true,
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    inline: true,
    contentBase: resolve('../dist'),
    port: 9999,
    open: true,
    hot: true,
    compress: true,
    overlay: {
      warning: false,
      errors: true,
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
}

module.exports = merge(webpackBaseConfig, webpackDevConfig)
