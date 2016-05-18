var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/react-cursor',

  output: {
    path: path.resolve('./dist'),
    filename: 'react-cursor.js',
    libraryTarget: 'umd',
    library: 'ReactCursor',
    publicPath: '/static/'
  },

  resolve: {
    extensions: ['', '.js'],
    root: [
      path.resolve('./src')
    ],
    modulesDirectories: ['node_modules']
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel'], include: path.resolve('./src')},
      {test: /node_modules\/update-in/, loader: 'babel'}
    ]
  },

  externals: {
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      // React dep should be available as window.React, not window.react
      'root': 'React'
    },
    'react-dom': {
      'commonjs': 'react-dom',
      'commonjs2': 'react-dom',
      'amd': 'react-dom',
      'root': 'ReactDOM'
    }
  }
};
