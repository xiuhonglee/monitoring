var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require('underscore');
var port = process.env.PORT || 8342;
var app = express();

var mongoose = require('mongoose');
var ScreenImg = require('./models/screenImg');

mongoose.connect('mongodb://localhost/monitor');


// 随机数生成函数
var getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};



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

// 存放静态资源
app.use(express.static(path.join(__dirname, 'public')));

app.locals.moment = require('moment');
app.listen(port);

console.log('server start at port :' + port);

// index page
app.get('/', function(req, res) {
	ScreenImg.fetch(function(err, screenimg) {
		if (err) {
			console.log(err);
		}
		res.render('index', {

		});
	});
});

// phantomjs
app.get('/phantomjs', function(req, res) {
	ScreenImg.fetch(function(err, screenimg) {
		if (err) {
			console.log(err);
		}
		res.render('phantomjs', {});
	});
});

app.get('/phantomjs/getdata', function(req, res) {

	var url = req.query.url,
		phantom = require('phantom'),
		t = Date.now();


	phantom.create().then(function(ph) {
		ph.createPage().then(function(page) {
			page.open(url).then(function(status) {
				console.log('status', status);
				
				res.json({
					'title': document.title
				});
			});
			phantom.exit();
		});
	});

});

// phantomcss
app.get('/phantomcss', function(req, res) {
	res.render('phantomcss', {});
});

app.get('/phantomcss/getBaseImg', function(req, res) {
	var url = req.query.url;
	var phantom = require('phantom');

	phantom.create()
		.then(function(ph) {
			ph.createPage().then(function(page) {
				page.open(url).then(function() {
					var getRandomInt = function(min, max) {
						return Math.floor(Math.random() * (max - min + 1)) + min;
					};

					var randomTail = getRandomInt(1, 9999999999);

					page.render(__dirname + '/public/screenshot/baseImg/_' + randomTail + '.png');
					res.json({
						status: 'ok',
						img: '/screenshot/baseImg/_' + randomTail + '.png'
					});
				});
			});
		});
});

app.get('/phantomcss/getTargetImg', function(req, res) {

	var url = req.query.url;
	var phantom = require('phantom');

	phantom.create()
		.then(function(ph) {
			ph.createPage().then(function(page) {
				page.open(url).then(function() {
					var randomTail = getRandomInt(1, 9999999999);
					page.render(__dirname + '/public/screenshot/targetImg/_' + randomTail + '.png');
					res.json({
						status: 'ok',
						img: '/screenshot/targetImg/_' + randomTail + '.png'
					});
				});
			});
		});
});