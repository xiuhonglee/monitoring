var mongoose = require('mongoose');
var MonitorSchema = require('../schemas/monitor');
var Monitor = mongoose.model('Monitor', MonitorSchema);

module.exports = Monitor; 