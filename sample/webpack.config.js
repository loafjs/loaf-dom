const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/sample.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'loaf-dom-sample.js'
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      options: {
        presets: ['env']
      },
      exclude: ['/node_modules']
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};