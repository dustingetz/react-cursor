/*global module:false*/
module.exports = function (grunt) {
  'use strict';

  var reactify = require('reactify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    bower: {
      install: {
        options: {
          copy: false,
          install: true,
          verbose: false,
          cleanTargetDir: false,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },

    browserify: {
      dev: {
        src: ['./webapp/js/Page.js'],
        dest: './webapp/js/build.js'
      },

      options: {
        transform: [reactify]
      }
    },


    less: {
      development: {
        options: {
          paths: ['styles'],
          ieCompat: true,
          yuicompress: true,
          report: 'min'
        },
        files: {
          'webapp/styles/App.css': 'webapp/styles/App.less'
        }
      }
    },

    clean: ['bower_components', 'webapp/libs', 'webapp/styles/App.css', 'webapp/Page.js']

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['browserify', 'less']);
};
