const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userid : {type : mongoose.Schema.Types.ObjectId,trim : true},
    media_url : {type : String,trim : true},
    description : {type : String,trim : true},
    total_likes : {type : Number,trim : true,default:0},
    total_dislikes : {type : Number,trim : true, default : 0}
})
module.exports = mongoose.model('posts',postSchema)