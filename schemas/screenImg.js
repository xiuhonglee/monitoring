var mongoose = require('mongoose');

var screenImgSchema = new mongoose.Schema({
	img: {
		data: Buffer,
		contentType: String
	}
});


screenImgSchema.statics = {
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

module.exports = screenImgSchema;