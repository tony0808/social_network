const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    title: String,
    content: String,
    author: {
        type:Schema.Types.ObjectId,
        ref:'User'
    }
}, {timestamps:true});

const Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;