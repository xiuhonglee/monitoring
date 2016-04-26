var mongoose = require('mongoose');
var monitorSchema = new mongoose.Schema({
	targetUrl: String,
	targetName: String,
	frequency: Number, // millisecond
	// quota: ['requests', 'timeToFirstByte', 'bodySize'],
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

monitorSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
});

// Methods and Statics: 
// Each Schema can define instance and static methods for its model
monitorSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.lean()
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			// Declares the query a findOne operation. 
			// When executed, the first found document is passed to the callback
			.findOne({
				_id: id
			})
			.exec(cb)
	}
};

module.exports = monitorSchema;