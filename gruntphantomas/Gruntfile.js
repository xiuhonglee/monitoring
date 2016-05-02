module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		phantomas: {
			gruntSite: {
				options: {
					indexPath: './phantomas/',
					options: {},
					url: 'http://m.mogujie.com/',
					buildUi: true
				}
			}
		}
	});
	// 加载包含 "uglify" 任务的插件。
	grunt.loadNpmTasks('grunt-phantomas');
	// 默认被执行的任务列表。
	grunt.registerTask('default', ['phantomas']);
};