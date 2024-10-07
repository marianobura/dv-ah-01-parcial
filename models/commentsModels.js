const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    description: String,
    created: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;