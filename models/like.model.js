const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    userid : {type : mongoose.Schema.Types.ObjectId,trim : true},
    post_id : {type : mongoose.Schema.Types.ObjectId, trim : true},
    
})
module.exports = mongoose.model('likes',likeSchema)