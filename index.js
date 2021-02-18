const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const dgram = require('dgram')
const room = require("./models/room.model");


const server = dgram.createSocket('udp4')

const http = require('http');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors())
app.use(bodyParser.json())

const url= "mongodb://localhost:27017/unityform";

mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit(); 
});

server.on('error', (error) => {
    console.log('error on server \n' + error.message)
    server.close()
}
)

server.on('listening', () => {
    const add = server.address()
    console.log(`server is listening on ${add.address}:${add.port}`)
})

server.on('message', (message, senderInfo) => {
    console.log("Message Recieved :" + message)
    
    const roomdata = new room({
        roomno: message.code,
        host: message.username,
        usersJoined : ["hd1","hd2","hd3"]
    })
    roomdata.save().then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while Saving the data."
            });
        });

    server.send(message, senderInfo.port, senderInfo.address, () => {
        console.log(`Message have been sent to ${senderInfo.address} : ${senderInfo.port}`)
    })
})



app.get('/',(req,res)=>{
    res.send("hello world")
})
require('./routes/user.route')(app);
require('./routes/room.route')(app);
require('./routes/posts.route')(app);
app.listen(9000, ()=>{
    console.log("server Started on 9000")
})
server.bind(9000) 