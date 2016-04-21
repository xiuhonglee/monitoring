var mongoose = require('mongoose');
var monitorSchema = require('../schemas/monitorSchema');
var monitorModel = mongoose.model('monitorModel', monitorSchema);

module.exports = monitorModel;