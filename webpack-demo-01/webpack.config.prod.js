const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const base = require('./webpack.config.base.js');

module.exports = {
  mode: 'production',
  ...base,
  plugins: [
    ...base.plugins,
    new miniCssExtractPlugin({
      filename: `[name].[contenthash].css`,
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      ...base.module.rules,
      {
        test: /\.css$/i,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
        ],
      },
    ],
  },
};
