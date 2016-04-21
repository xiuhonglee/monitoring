var mongoose = require('mongoose');
var monitorSchema = new mongoose.Schema({
	targetUrl: String, 
	targetName: String,
	quota: ['requests', 'timeToFirstByte', 'bodySize'],
	created: {
		type: Date,
		default: Date.now
	},	
	updated: {
		type: Date,
		default: Date.now
	}
});

monitorSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({
				_id: id
			})
			.exec(cb)
	}
};

module.exports = monitorSchema;