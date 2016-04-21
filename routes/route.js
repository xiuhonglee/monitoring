module.exports = function(app) {
	
	// view: 组件-table
	app.get('/components/table', function(req, res) {
		res.render('components/table', {
			title: 'Table组件'
		});
	});
	// view: 组件-form
	app.get('/components/forms', function(req, res) {
		res.render('components/forms', {
			title: 'Forms组件'
		});
	});
	// view: 组件-button
	app.get('/components/buttons', function(req, res) {
		res.render('components/buttons', {
			title: 'Buttons组件'
		});
	});

	// view: index page
	app.get('/', function(req, res) {
		res.render('index', {
			title: '前端自动化监控平台'
		});
	});

	// view: index page
	app.get('/monitor/list', function(req, res) {
		res.render('index', {
			title: '监控列表'
		});
	});

	// view: create monitor page
	app.get('/monitor/createMonitor', function(req, res) {
		res.render('monitor/createMonitor', {
			title: '创建监控项',
			monitor: {
				targetUrl: '',
				targetName: ''
			}
		});
	});

	// control: create monitor
	app.post('/control/monitor/createMonitor', function(req, res) {
		

	});


};






