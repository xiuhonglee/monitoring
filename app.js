var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8342;
var app = express();

app.set('views', './views/pages');
app.set('view engine', 'jade');

// 开发环境，格式化输出
if (app.get('env') === 'development') {
	app.locals.pretty = true;
}

app.use(bodyParser.json({
	verify: function(req, res, buf, encoding) {
		rawBody = buf;
	}
}));

app.use(bodyParser.urlencoded({
	extended: true
}));

// 用来格式化JavaScript时间
app.locals.moment = require('moment');
// app.local: 应用程序本地变量会附加给所有的在这个应用程序内渲染的模板。 
// 这是一个非常有用的模板函数，就像应用程序级数据一样

// 存放静态资源
app.use(express.static(path.join(__dirname, 'public')));

// mongodb
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/monitor');

// 配置路由，必须把配置路由放在 bodyParser / app.config后
// 否则req.body无法正常解析
var routes = require('./routes/route')(app);

app.listen(port, function() {
	console.log('server start at port :' + port);
});