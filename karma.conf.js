
module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    frameworks: [ 'mocha', 'sinon-chai' ],
    reporters: [ 'mocha' ],

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }
  });
};
