var mongoose = require('mongoose');
var ScreenImgSchema = require('../schemas/screenImg');
var ScreenImg = mongoose.model('ScreenImg', ScreenImgSchema);

module.exports = ScreenImg;