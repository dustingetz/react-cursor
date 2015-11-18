var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/react-cursor',

  output: {
    path: path.resolve('./dist'),
    filename: 'react-cursor.js',
    publicPath: '/static/'
  },

  resolve: {
    extensions: ['', '.js'],
    root: [
      path.resolve('./src')
    ],
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel'], include: path.resolve('./src')}
    ]
  }
};
