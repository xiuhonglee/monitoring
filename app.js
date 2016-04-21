var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require('underscore');
var port = process.env.PORT || 8342;
var app = express();

// 配置路由
var routes = require('./routes/route')(app);

app.set('views', './views/pages');
app.set('view engine', 'jade');

app.use(bodyParser.json({
	verify: function(req, res, buf, encoding) {
		req.rawBody = buf;
	}
}));

app.use(bodyParser.urlencoded({
	extended: true
}));

// mongodb
var mongoose = require('mongoose');
var monitorModel = require('./mongodb/models/monitorModel');
// mongoose.connect('mongodb://localhost/monitor');

// 开发环境，格式化输出
if (app.get('env') === 'development') {
	app.locals.pretty = true;
}

// 存放静态资源
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function () {
	console.log('server start at port :' + port);
});