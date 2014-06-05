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

        requirejs: {
            options: {
                optimize: 'none',
                inlineText: true,
                useStrict: true,
                skipPragmas: true,
                preserveLicenseComments: true,

                wrap: {
                    "startFile": "almond-begin.txt",
                    "endFile": "almond-end.txt"
                },


                baseUrl: 'js',

                paths: {
                    almond: '../bower_components/almond/almond',
                    react: '../bower_components/react/react-with-addons'
                },

                shim: {
                    react: { deps: [], exports: 'React'}
                },

                uglify: {
                    toplevel: true,
                    ascii_only: true,
                    beautify: true,
                    max_line_length: 1000,
                    defines: { DEBUG: ['name', 'false'] },
                    no_mangle: true
                }
            },
            compile: {
                options: {
                    out: 'dist/wingspan-cursor.js',
                    include: ['almond', 'wingspan-cursor'],
                    exclude: ['require', 'react']
                }
            }
        },

        clean: ['bower_components', 'dist'],

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['bower:install']);
    grunt.registerTask('release', ['clean', 'bower:install', 'requirejs']);
};
