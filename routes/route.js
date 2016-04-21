module.exports = function(app) {
	
	// 组件-table
	app.get('/components/table', function(req, res) {
		res.render('components/table', {});
	});
	// 组件-form
	app.get('/components/forms', function(req, res) {
		res.render('components/forms', {});
	});
	// 组件-button
	app.get('/components/buttons', function(req, res) {
		res.render('components/buttons', {});
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