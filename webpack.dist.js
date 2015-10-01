var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config');

config.devtool = false;

config.output = {
  path: path.resolve(__dirname, 'lib'),
  filename: 'react-cursor.min.js',
  libraryTarget: 'umd',
  library: 'ReactCursor',
  publicPath: '/static/'
};

config.externals = {
  'react/addons': 'React'
};

config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({ minimize: true })
];

module.exports = config;
