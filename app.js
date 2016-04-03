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



// app.get('/phantomcss/getDiffImg', function(req, res) {
// 	var url = req.query.url;
// 	var phantom = require('phantom');
// 	var resemble = require('resemblejs');
// 	var img1, img2;

// 	fs.readFile(__dirname + '/public/screenshot/baseImg/_1708875937.png', (err, data) => {
// 		if (err) throw err;
// 		img1 = data;
// 		console.log('img1', img1);
// 	});

// 	fs.readFile(__dirname + '/public/screenshot/targetImg/_7596399160.png', (err, data) => {
// 		if (err) throw err;
// 		img2 = data;
// 		console.log('img2', img2);
// 	});

// 	phantom.create()
// 		.then(function(ph) {
// 			ph.createPage().then(function(page) {
// 				console.log(__dirname + '/public/screenshot/baseImg/_1708875937.png');
// 				// var img1 = new Buffer(__dirname + '/public/screenshot/baseImg/3629484375.png', 'base64');
// 				// var img2 = new Buffer(__dirname + '/public/screenshot/target/6753631523.png', 'base64');
// 				// console.log('img1', img1);
// 				// console.log('img2', img2);
// 				console.log(_3629484375.png);
// 				var diff = resemble('_3629484375.png')
// 					.compareTo('_6753631523.png')
// 					.ignoreColors()
// 					.onComplete(function(data) {
// 						console.log(data);
// 					});


// 				// resemble('_3629484375.png')
// 				// 	.compareTo('_6753631523.png')
// 				// 	.ignoreColors()
// 				// 	.onComplete(function(data) {
// 				// 		console.log(111);
// 				// 		console.log(data);
// 				// 		res.send({
// 				// 			status: 'ok'
// 				// 		});
// 				// 	});

// 			});
// 		});
// });

// var compareImages = function(res) {
// 	resemble.outputSettings({
// 		largeImageThreshold: 0
// 	});
// 	var diff = resemble('')
// 		.compareTo('')
// 		.ignoreColors()
// 		.onComplete(function(data) {
// 			console.log(data);
// 			var png = data.getDiffImage();
// 			fs.writeFile('diff.png', png.data, null, function(err) {
// 				if (err) {
// 					throw 'error writing file: ' + err;
// 				}
// 				console.log('file written');
// 			});
// 			res.render('compare');
// 		});
// };