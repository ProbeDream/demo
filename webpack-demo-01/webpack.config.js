let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let miniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `[name].[contenthash].js`,
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'probedream',
      template: './src/assets/template.html',
    }),
    new miniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
};
