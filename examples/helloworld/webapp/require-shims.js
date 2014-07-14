/* global require */
(function () {
  'use strict';

  require.config({
    baseUrl: 'js-built',
    paths: {
      'underscore': '../lib/underscore',
      'jquery': '../lib/jquery',
      'react': '../lib/react-with-addons',
      'react-cursor': '../lib/react-cursor'
    },
    shim: {
      'underscore': { deps: [], exports: '_' },
      'jquery': { deps: [], exports: '$' },
      'react': { deps: [], exports: 'React'},
      'react-cursor': { deps: ['underscore'], exports: 'ReactCursor' }
    }
  });
})();
