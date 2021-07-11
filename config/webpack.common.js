const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')

function resolve(...args) {
  return path.resolve(__dirname, ...args)
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['react-hot-loader/patch', resolve('../src/index.tsx')],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['node_modules'],
    alias: {
      '@style': resolve('../src/style'),
      '@assets': resolve('../src/assets'),
    },
  },
  stats: 'errors-only',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        use: ['thread-loader', 'babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('../index.html'),
      title: 'Webpack5 React',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: '' }],
    }),
    new ForkTsCheckerPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      cacheGroups: {
        defaultVendors: {
          chunks: 'all',
          name: 'vendors',
          test: /node_modules/,
        },
      },
    },
  },
}
