const mongoose = require("mongoose");
const User = require("./user");

const blogSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number
    },
    comments: {
        type: [{
                username: {
                    type: String
                },
                content: {
                    type: String
                }
            }]
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;