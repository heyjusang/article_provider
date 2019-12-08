const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: String,
    content: String
});

adSchema.statics.findPrevById = function(current_id) {
    if (current_id) {
        return this.find().where('_id').lt(current_id).sort('-_id').limit(1);
    }
    else {
        return this.find().sort('-_id').limit(1);
    }
}

module.exports = mongoose.model('Ad', adSchema);