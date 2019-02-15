const mongoose = require('mongoose');

const bookPromotion = new mongoose.Schema({
    dateFrom: {type: mongoose.Schema.Types.Date, required:true},
    dateTo: {type: mongoose.Schema.Types.Date, required:true},
    book: {type: mongoose.Schema.Types.ObjectId, ref:'Book'},
});

const BookPromotion = mongoose.model('BookPromotion', bookPromotion);
module.exports = BookPromotion;