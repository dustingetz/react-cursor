var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/react-cursor',

  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    publicPath: '/static/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve('./src')
    ],
    modulesDirectories: [
      'node_modules'
    ]
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    }]
  }
};
