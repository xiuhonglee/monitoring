var mongoose = require('mongoose');
var monitorSchema = require('../schemas/monitorSchema');
var monitorModel = mongoose.model('monitor', monitorSchema);

module.exports = monitorModel;