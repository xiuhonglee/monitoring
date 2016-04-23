module.exports = function(app) {

	var Monitor = require('../mongodb/models/monitorModel');

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

	// view: monitor list
	app.get('/monitor/list', function(req, res) {
		Monitor.fetch(function(err, monitor) {
			if (err) {
				console.log(err);
			}
			res.render('index', {
				title: '监控列表',
				monitor: monitor
			});
		});

	});

	// view: create monitor page
	app.get('/monitor/createMonitor', function(req, res) {
		res.render('monitor/createMonitor', {
			title: '创建监控项',
			monitor: {
				targetUrl: '',
				targetName: '',
				frequency: 300000 // 默认值5分钟
			}
		});
	});

	// admin update monitor
	app.get('/monitor/update/:id', function(req, res) {
		var id = req.params.id;
		if (id) {
			Monitor.findById(id, function(err, monitor) {
				res.render('monitor/createMonitor', {
					title: '修改监控项',
					monitor: monitor
				})
			});
		}
	});

	// control: create monitor
	app.post('/control/monitor/createMonitor', function(req, res) {
		var id = req.body.monitor._id;
		var monitorObj = JSON.parse(JSON.stringify(req.body.monitor));
		var _monitor;
		if (id !== 'undefined') {
			Monitor.findById(id, function(err, monitor) {
				if (err) {
					console.log(err);
				}
				_monitor = _.extend(monitor, monitorObj);
				_monitor.save(function(err, monitor) {
					if (err) {
						console.log(err);
					}
					res.redirect('/monitor/' + monitor._id);
				});
			});
		} else {
			_monitor = new Monitor({
				targetUrl: monitorObj.targetUrl,
				targetName: monitorObj.targetName,
				frequency: monitorObj.frequency
			});
			_monitor.save(function(err, monitor) {
				if (err) {
					console.log(err);
				}
				res.redirect('/monitor/list');
			});
		}
	});
};