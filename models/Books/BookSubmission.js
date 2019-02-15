const mongoose = require('mongoose');

const bookSubmissionSchema = new mongoose.Schema({
    createdOn: {type: mongoose.Schema.Types.Date, default: Date.now},
    website: {type: mongoose.Schema.Types.String, required: true},
    result: {type: mongoose.Schema.Types.String, required: true},
    bookPromotion: {type: mongoose.Schema.Types.ObjectId, ref:'BookPromotion'},
});

const BookSubmission = mongoose.model('BookPromotion', bookSubmissionSchema);
module.exports = BookSubmission;