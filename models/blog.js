const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    content: String,
    author: {
        type:Schema.Types.ObjectId,
        ref:'User'
    }
}, {timestamps:true});

const Blog = mongoose.model('blog', blogSchema);
module.exports = Blog;