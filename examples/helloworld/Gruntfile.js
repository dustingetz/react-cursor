/*global module:false*/
module.exports = function (grunt) {
  'use strict';

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

    subgrunt: {
      options: {},
      'default': {
        '../../': ['release']
      }
    },

    react: {
      app: {
        files: [{ expand: true, cwd: 'webapp/js', src: ['**/*.js'], dest: 'webapp/js-built', ext: '.js' }]
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

    copy: {
      'libs': {
        files: [
          {
            expand: true,
            src: [
              'bower_components/jquery/jquery.js',
              'bower_components/underscore/underscore.js',
              'bower_components/react/react-with-addons.js',
              'bower_components/requirejs/require.js',
              '../../dist/wingspan-cursor.js'
            ],
            dest: 'webapp/lib',
            flatten: true,
            filter: 'isFile'
          }
        ]
      }
    },

    clean: ['bower_components', 'webapp/js-built', 'webapp/libs', 'webapp/styles/App.css', 'webapp/Page.js']

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-subgrunt');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['bower:install', 'subgrunt', 'copy', 'react', 'less']);
};