var mongoose = require('mongoose');

var MonitorSchema = new mongoose.Schema({
	doctor: String,
	meta: {

	}
});

MonitorSchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else {
		this.meta.updateAt = Date.now();
	}
	next();
});

MonitorSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	}
};

module.exports = MonitorSchema;

