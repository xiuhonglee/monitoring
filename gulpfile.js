var gulp = require('gulp'),
    path = require('path');

var jade = require('gulp-jade'),
    server = require('gulp-develop-server'),
    livereload = require('gulp-livereload');

livereload({
    port: 35729,
    start: true
});

var options = {
    path: './app.js'
};

var serverFiles = [
    './app.js',
    './routes/*',
    './mongodb/*'
];

var htmlCssJsFile = [
    './views/**/*.jade',
    './public/style/**.css',
    './public/js/*.js'
];

gulp.task('server:start', function() {
    server.listen(options);
});

gulp.task('watch', function() {
    gulp.watch('.views/*.*', function() {
        livereload();
    });
});

// If server scripts change, restart the server and then livereload.
gulp.task('default', ['server:start'], function() {
    // 重启Server
    function restart(file) {
        server.changed(function(error) {
            if (!error) livereload.changed(file.path);
        });
    }
    gulp.watch(serverFiles).on('change', restart);

    // 刷新页面，没生效
    // gulp.watch(htmlCssJsFile).on('change', function(file) {
    //     livereload.changed(file.path);
    // });
});






