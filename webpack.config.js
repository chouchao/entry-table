const path = require('path');

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
  devtool: "source-map"
};