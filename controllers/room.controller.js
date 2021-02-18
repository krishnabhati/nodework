const room = require("../models/room.model.js");

exports.roomcreate = (req, res) => {
    const roomdata = new room({
        roomno: req.body.roomcode,
        host: req.body.host,
        usersJoined: req.body.usersJoined
    })

    //save data in db
    roomdata.save().then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while Saving the data."
            });
        });
};

