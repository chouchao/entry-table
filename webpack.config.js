const path = require('path');
const webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/jquery.entryTable.ts',
  output: {
    filename: 'jquery.entryTable.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  resolve: {
    extensions: [".ts", ".json", ".css"],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: __dirname + '/src/jquery.entryTable.css'
    }])
  ],
  devtool: "source-map"
};