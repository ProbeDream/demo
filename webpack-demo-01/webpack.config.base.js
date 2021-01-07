const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
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
  ],
};
