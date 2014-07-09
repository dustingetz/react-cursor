/* global require */
(function () {
  'use strict';

  require.config({
    baseUrl: 'js-built',
    paths: {
      'underscore': '../lib/underscore',
      'jquery': '../lib/jquery',
      'react': '../lib/react-with-addons',
      'wingspan-cursor': '../lib/wingspan-cursor'
    },
    shim: {
      'underscore': { deps: [], exports: '_' },
      'jquery': { deps: [], exports: '$' },
      'react': { deps: [], exports: 'React'},
      'wingspan-cursor': { deps: ['underscore'], exports: 'WingspanCursor' }
    }
  });
})();
