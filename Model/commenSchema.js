
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Post', { useNewUrlParser: true, useUnifiedTopology: true });

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    feedId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);

