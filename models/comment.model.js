const mongoose = require('mongoose');

// const commentschema = new mongoose.Schema({
//     Comment : {type : String , trim : true},
//     replyComment : {type : String , trim : true},
//     replieruserid : {type : mongoose.Schema.Types.ObjectId,trim : true},
// })

const cmntSchema = new mongoose.Schema({
    userid : {type : mongoose.Schema.Types.ObjectId,trim : true},
    post_id : {type : mongoose.Schema.Types.ObjectId, trim : true},
    comment : [{
        message: { type: String, trim: true },
        createdAt: { type: Date },
        updatedAt: { type: Date },
        replies: [{
            commentatorId: { type: mongoose.Schema.Types.ObjectId },
            message: { type: String, trim: true },
            createdAt: { type: Date },
            updatedAt: { type: Date },
            commentatorDetails: {
                fullName: { type: String, trim: true, default: "" },
                userName: { type: String, trim: true },
                //profilePicture: { type: String, default: "" },
            }
        }]
    }]
    
})

module.exports = mongoose.model('comments',cmntSchema)