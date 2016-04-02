var gulp = require('gulp');
var phantomcss = require('gulp-phantomcss');

gulp.task('phantomcss', function() {
	gulp.src('./testsuite.js')
		.pipe(phantomcss({
				'mismatchTolerance': 0.05,
				'screenshots': 'screenshots',
				'results': 'results',
				'viewportSize': [1280, 800],
			},
			src: [
				'phantomcss.js'
			]
	}));
});