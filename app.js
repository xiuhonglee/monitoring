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
    verify: function (req, res, buf, encoding) {
        req.rawBody = buf;
    }
})); 
app.use(bodyParser.urlencoded({ extended: true })); 
/******/

app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('imooc start at port :' + port);

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

// app.get('/phantomjs', function(req, res) {
// 	Monitor.fetch(function(err, monitor) {
// 		if (err) {
// 			console.log(err);
// 		}
// 		res.render('PhantomJS', {

// 		});
// 	});
// });

