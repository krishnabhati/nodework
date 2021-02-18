const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    roomno: String,
    host: String,
    usersJoined : []
});

module.exports = mongoose.model('room', RoomSchema)
