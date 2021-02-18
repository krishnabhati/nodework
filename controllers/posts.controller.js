const posts = require("../models/posts.model");
const users = require("../models/user.model");
const likes = require("../models/like.model");
const comments = require('../models/comment.model');

exports.createpost = async (req, res) => {
    try {
        let tokendata = req.token;
        let userData = await users.findOne({
            _id: tokendata._id
        }, {}, { lean: true })
        if (userData) {

            const newPost = new posts({
                userid: userData._id,
                media_url: req.body.media_url,
                description: req.body.description,
            })
            let data = await newPost.save();
            //console.log(data)

            res.send({
                msg: "post added successfully",
                postdata: data
            })
        } else {
            res.send({
                msg: "User Not Found"
            })
        }
    } catch (err) {
        console.log(err, "ERROOOOOOOOOOOOOOOOOOOr");
        res.status(500).send({
            message:
                err.message || "Some error occurred while Adding the Post."
        });
    }
}

exports.getPosts = async (req, res) => {
    let tokendata = req.token;
    console.log(tokendata, ">>>>>>>>>><<<<<<<<<<<<");
    let aggPipe = [
        {
            $lookup: {
                from: "users",
                localField: "userid",
                foreignField: "_id",
                as: "postdata"
            }
        },
        { $unwind: "$postdata" }
    ];
    let getallPosts = await posts.aggregate(aggPipe)
    //console.log(getallPosts);
    res.send({
        status: 200,
        data: getallPosts
    })

}
exports.likepost = async (req, res) => {
    try {
        let tokendata = req.token;

        let postexist = await posts.findOne({
            _id: req.body.post_id
        })
        if (postexist) {

            let likeExist = await likes.findOne({
                userid: tokendata._id,
                post_id: req.body.post_id

            })

            if (likeExist) {

                // let query = {
                //     _id: req.body.post_id
                // };
                // let update = {
                //     $dec: {
                //         [total_likes]: 1
                //     },
                // };
                let removelike = await posts.updateOne({ _id: req.body.post_id }, { $inc: { total_likes: -1 } });
                let deletelike = await likes.findOneAndDelete({ post_id: req.body.post_id })
                //console.log("deletelike",deletelike)
                res.send({
                    msg: "Remove like Successfully"
                })

            } else {

                let newLike = new likes({
                    userid: tokendata._id,
                    post_id: req.body.post_id
                })

                let likesave = await newLike.save();
                // let query = {
                //     _id: req.body.post_id
                // };
                // let update = {
                //     $inc: {
                //      [total_likes]: 1
                //     },
                // };
                let updatelike = await posts.updateOne({ _id: req.body.post_id }, { $inc: { total_likes: 1 } });
                res.send({
                    msg: "Post liked successfuly"
                })
            }
        } else {
            res.send({
                msg: "Post doesn't exist"
            })
        }
    } catch (err) {
        console.log(err, "ERROOOOOOOOOOOOOOOOOOOr");
        res.status(500).send({
            message:
                err.message || "Some error occurred while liking post the Post."
        });
    }

}
exports.commentpost = (req, res) => {
    try {
        let tokendata = req.token;

        let postexist = await posts.findOne({
            _id: req.body.post_id
        })
        if (postexist) {
            let newcomment = new comments({
                userid: tokendata._id,
                post_id: req.body.post_id,
                comment: {
                    comment : req.body.comment,
                    replyComment : req.body.replyComment,
                    replieruserid : req.body.replieruserid
                }
            })

            let cmnt = await newcomment.save()
              

            res.send({
                msg: "Commented Successfully",
                data: { ...cmnt, ...commentcount }
            })
        }
    } catch (err) {
        console.log(err, "ERROOOOOOOOOOOOOOOOOOOr");
        res.status(500).send({
            message:
                err.message || "Some error occurred while Commenting on the Post."
        });
    }
}



exports.addcommentReplies = (req,res)=>{
    
        try {
            let tokendata = req.token;
            let cmntexist = await comments.findOne({
                _id : req.body.commentId
            }) 
            if(cmntexist){
                let reply =[];
                // let userData = await users.findOne({
                //     _id : tokendata._id
                // })
                reply.push({ message: payload.message,
                    commentatorId: Types.ObjectId(payload.userId),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    commentatorDetails: tokendata}
                    )
                    let replycomment = await comments.updateOne({ post_id: req.body.post_id , comments: { $elemMatch: { _id: req.body.commentId } } }, {
                        $push: { "comments.$.replies": reply }})
                        let commentcount = await posts.updateOne({ _id: req.body.post_id }, { $inc: { total_comments: 1 } });
                        res.send({
                            msg: "comment added successfully",
                            data : {...commentcount, ...replycomment}
                        })
            }

        } catch (err) {
            console.log(err, "ERROOOOOr");
            res.status(500).send({
                message:
                    err.message || "Some error occurred while Commenting on the Post."
            });
        }
    }

    exports.getallComment = (req,res) =>{
        try{
        let postId = req.body.post_id;

        let postcheck = await posts.findOne({
            _id : postId
        })
        if(postcheck){
            let allcomments = await comments.find({
                post_id : postId
            })
            res.send({
                data : allcomments
            })
        }else{
            res.send("Post Not Available")
        }
    }catch (err) {
        console.log(err, "ERROOOOOr");
        res.status(500).send({
            message:
                err.message || "Some error occurred while fetching Comments."
        });
    }


    }
