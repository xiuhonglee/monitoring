var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var _ = require('underscore');
var port = process.env.PORT || 8342;
var app = express();

var mongoose = require('mongoose');
var Monitor = require('./models/monitor');

mongoose.connect('mongodb://localhost/monitor');

app.set('views', './views/pages');
app.set('view engine', 'jade');

// 开发环境，格式化输出
if (app.get('env') === 'development') {
	app.locals.pretty = true;
}

/***
	关于bodyParse报错
	error:bodyParser is deprecated express 4
	link to: http://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4 ***/

app.use(bodyParser.json({
	verify: function(req, res, buf, encoding) {
		req.rawBody = buf;
	}
}));
app.use(bodyParser.urlencoded({
	extended: true
}));
/******/

app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('server start at port :' + port);

// index page
app.get('/', function(req, res) {
	Monitor.fetch(function(err, monitor) {
		if (err) {
			console.log(err);
		}
		res.render('index', {

		});
	});
});

// phantomjs
app.get('/phantomjs', function(req, res) {
	Monitor.fetch(function(err, monitor) {
		if (err) {
			console.log(err);
		}
		res.render('phantomjs', {});
	});
});

app.get('/phantomjs/getdata', function(req, res) {

	var phantom = require('phantom'),
		url = req.query.url;

	// 生成截图
	phantom.create().then(function(ph) {
		ph.createPage().then(function(page) {
			page.open(url).then(function(status) {
				if (status === 'success') {
					console.log('suc');
					page.render('/public/screenshot/bbb.png');
					res.json({
						status: 'ok',
						img: '/screenshot/bbb.png'
					});
				} else {
					res.json({
						status: 'failed'
					});
				}
			});
		});
	});

});


// phantomcss
app.get('/phantomcss', function(req, res) {
	res.render('phantomcss', {});
});

app.get('/phantomcss/getdata', function(req, res) {
	var url = req.query.url;
	var phantom = require('phantom');

	phantom.create().then(function(ph) {
		ph.createPage().then(function(page) {
			page.onResourceRequested = function(request) {
				console.log('Request ' + JSON.stringify(request, undefined, 4));
				res.json({
					res: JSON.stringify(request, undefined, 4)
				});
			};

			page.onResourceReceived = function(response) {
				res.json({
					source: 'receive',
					res: JSON.stringify(response, undefined, 4)
				});
			};
		});
	});


});