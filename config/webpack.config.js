const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './js/app.js',
  },
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devServer: {
    contentBase: 'dist',
    port: 3005,
  },
};
