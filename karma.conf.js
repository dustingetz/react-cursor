var path = require('path');

module.exports = function (config) {
  var configuration = {
    browsers: [ 'Chrome' ],
    frameworks: [ 'mocha', 'sinon-chai' ],
    
    reporters: [ 'mocha' ],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['', '.js'],
        root: [
          path.resolve('./src')
        ],
        modulesDirectories: ['node_modules']
      },
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel', include: path.resolve('./src') },
          { test: /node_modules\/update-in/, loader: 'babel'}
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }
  };

  if(process.env.TRAVIS) {
    configuration.browsers = [ 'Chrome_travis_ci' ];
  }

  config.set(configuration);
};
