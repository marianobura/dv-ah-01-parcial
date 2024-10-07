const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    body: String,
    tags: {
        type: Array,
        default: false
    },
    reactions: {
        likes: {
            type: Number,
            default: false
        },
        dislikes: {
            type: Number,
            default: false
        }
    },
    views: {
        type: Number,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;