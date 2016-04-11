'use strict';
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        phantomas: {
            default: {
                options: {
                    url: 'http://m.mogujie.com/',
                    indexPath: 'phantomas/',
                    output: 'json',
                    options: {
                        'film-strip': false
                    },
                    assertions: {
                        assetsWithQueryString: 3, // receive warning, when there are more than 3 assets with a query string
                        bodyHTMLSize: 10500, // receive warning, when the bodyHTMLsize is bigger than 10500
                        jsErrors: 0, // receive warning, when more than 0 JS errors appear
                        gzipRequests: { // receive warning, when less compressed assets are loaded then 10 ( might be useful for checking server configurations )
                            type: '<',
                            value: 10
                        }
                    },
                    group: {
                        'TIMINGS': [
                            'timeToFirstByte',
                            'timeToLastByte',
                            'timeToFirstCss',
                            'timeToFirstJs',
                            'timeToFirstImage',
                            'fastestResponse',
                            'slowestResponse',
                            'onDOMReadyTime',
                            'onDOMReadyTimeEnd',
                            'windowOnLoadTime',
                            'windowOnLoadTimeEnd',
                            'httpTrafficCompleted',
                            'timeBackend',
                            'timeFrontend'
                        ]
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-phantomas');
    grunt.registerTask('default', ['phantomas:default']);
};