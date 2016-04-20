module.exports = function(app) {
	
	// 组件-table
	app.get('/components/table', function(req, res) {
		res.render('components/table', {});
	});

	// index page
	app.get('/?index', function(req, res) {
		res.render('index', {});
	});

};