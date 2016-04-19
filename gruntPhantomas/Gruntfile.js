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
                        'assetsWithQueryString': 3,
                        'biggestLatency': 1400,
                        'bodyHTMLSize': 10500,
                        'commentsSize': 55,
                        'consoleMessages': 0,
                        'hiddenContentSize': 65,
                        'jsErrors': 0,
                        'gzipRequests': 8,
                        'medianResponse': 400,
                        'nodesWithInlineCSS': 0,
                        'requests': 30,
                        'timeToFirstImage': 800,
                        'DOMelementsCount': 200,
                        'DOMqueries': 10
                    }
                    // group: {
                    //     'TIMINGS': [
                    //         'timeToFirstByte',
                    //         'timeToLastByte',
                    //         'timeToFirstCss',
                    //         'timeToFirstJs',
                    //         'timeToFirstImage',
                    //         'fastestResponse',
                    //         'slowestResponse',
                    //         'onDOMReadyTime',
                    //         'onDOMReadyTimeEnd',
                    //         'windowOnLoadTime',
                    //         'windowOnLoadTimeEnd',
                    //         'httpTrafficCompleted',
                    //         'timeBackend',
                    //         'timeFrontend'
                    //     ]
                    // }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-phantomas');
    grunt.registerTask('default', ['phantomas:default']);
};