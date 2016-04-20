var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require('underscore');
var port = process.env.PORT || 8342;
var app = express();
var routes = require('./routes/route')(app);


var mongoose = require('mongoose');
app.listen(port, function () {
	console.log('server start at port :' + port);
});



var ScreenImg = require('./models/screenImg');

// mongoose.connect('mongodb://localhost/monitor');

app.set('views', './views/pages');
app.set('view engine', 'jade');

// 开发环境，格式化输出
if (app.get('env') === 'development') {
	app.locals.pretty = true;
}
app.use(bodyParser.json({
	verify: function(req, res, buf, encoding) {
		req.rawBody = buf;
	}
}));

app.use(bodyParser.urlencoded({
	extended: true
}));

// 存放静态资源
app.use(express.static(path.join(__dirname, 'public')));







