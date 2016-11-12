var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractSASS = new ExtractTextPlugin('styles.css');

module.exports = {
  entry: [
    './src/styles.scss',
    './src/Select',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: {
    'react': 'react',
    'lodash' : 'lodash',
    'classnames' : 'classnames'
  },
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loader: extractSASS.extract(['css','sass'])
      }
    ]
  },
  plugins: [
    extractSASS
  ]
};
