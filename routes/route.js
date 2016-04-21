module.exports = function(app) {
	
	// 组件-table
	app.get('/components/table', function(req, res) {
		res.render('components/table', {});
	});

	app.get('/components/forms', function(req, res) {
		res.render('components/forms', {});
	});

	// index page
	app.get('/', function(req, res) {
		res.render('index', {});
	});

	// index page
	app.get('/monitor/createMonitor', function(req, res) {
		res.render('monitor/createMonitor', {});
	});

};