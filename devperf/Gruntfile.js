module.exports = function(grunt) {

    grunt.initConfig({
        devperf: {
            options: {
                urls: [
                    // Insert the URLs you want to test in this list
                    'http://m.mogujie.com/'
                ],
                openResults: true,
                timeout: 300,
                numberOfRuns: 5,
                resultsFolder: './resPages'
            }
        }
    });

    grunt.loadNpmTasks('grunt-devperf');
    grunt.registerTask('default', ['devperf']);
};