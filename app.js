var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require('underscore');
var port = process.env.PORT || 8342;
var app = express();

var express = require('express');
var app = express();


app.listen(port, function () {
	console.log('server start at port :' + port);
});


var mongoose = require('mongoose');
var ScreenImg = require('./models/screenImg');

// mongoose.connect('mongodb://localhost/monitor');

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


// index page
app.get('/', function(req, res) {
	// res.send('hello world');
	res.render('index', {});
});






