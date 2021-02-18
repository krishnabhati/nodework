const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const { sendMessage } = require('../services/smsManager')
const { sendVerificationEmail } = require('../services/mailManager')
const Joi = require('joi');


// Create and Save a new Note
exports.create = async (req, res) => {
  try {
   
      let Email = req.body.email;
      let Mobile = req.body.mobile;
      let userName = req.body.username;

      let existdata = await User.findOne({ $or: [{ email: Email }, { mobile: Mobile }, { username: userName }] })
      if (existdata) {
        res.status(200).json({
          Status: 200,
          data: "User Already Exist"
        });
      } else {
        let OTP = "1234";
        const newuser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          mobile: req.body.mobile,
          countryCode: req.body.countryCode,
          OTP: OTP
        });
        // console.log(newuser,"NEWWWWWWWWWWWW");
        // Save Tutorial in the database
        let data = await newuser.save();
        let payload = {
          _id: data.id,
          username: data.username,
          email: data.email,
          mobile: data.mobile,
          countryCode: data.countryCode
        }
        //console.log(payload, "NEWWWWWWWWWWWW");
        let authToken = await jwt.sign(payload, "krishna", { algorithm: "HS256", expiresIn: "5m" });
        //console.log(authToken, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        //console.log(data.email, "EMAILLLLLLLLLLLL");

        //let sendOTP = await sendMessage(data.countryCode, data.mobile, data.username, OTP);
        // payload.mailAccessToken = authToken;
        let verifyemail = await sendVerificationEmail(data.email)
        res.send({
          data: data,
          accessToken: authToken

        });
      }
    }// .
  catch (err) {
    console.log(err, "ERROOOOOOOOOOOOOOOOOOOr");
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  }
}

exports.verifyotp = async (req,res) =>{

  let token = req.token;
  console.log(token);
  let {OTP} = req.body;

  let userdata = await User.findOne({
    _id : token._id
  },{},{lean : true})
console.log(userdata, "userdata");
  if(userdata.OTP == OTP){
    let payload = {
      _id: userdata._id,
      username: userdata.username,
      email: userdata.email,
      mobile: userdata.mobile,
      countryCode: userdata.countryCode
    }
    //console.log(payload, "NEWWWWWWWWWWWW");
    let authToken = await jwt.sign(payload, "krishna", { algorithm: "HS256", expiresIn: "180d" });
    //console.log(authToken, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    res.send({
      msg : "SignUp Successfully",
      data: userdata,
      accessToken: authToken

    });
  }



}

// Retrieve and return all notes from the database.

exports.findAll = (req, res) => {
  // const username = req.query.username;

  User.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred "
      });
    });
};



// Find a single note with a noteId
exports.login = async (req, res) => {
  let Email = req.body.email;
  let Mobile = req.body.mobile;
  let userName = req.body.username;

  const userdata = await User.findOne({ $or: [{ email: Email }, { mobile: Mobile }, { username: userName }] })
    if(userdata){
      console.log("userexist")
      if(userdata.password == req.body.password){
        console.log("Login successfully")
        let payload = {
          _id: userdata._id,
          username: userdata.username,
          email: userdata.email,
          mobile: userdata.mobile,
          countryCode: userdata.countryCode
        }
        //console.log(payload, "NEWWWWWWWWWWWW");
        let authToken = await jwt.sign(payload, "krishna", { algorithm: "HS256", expiresIn: "180d" });
        res.send({
          msg : "Login Successfully",
          status : 200,
          accessToken : authToken
        })
      }else{
        res.send({
          msg : "Wrong Credintials",
          status : 400
        })
      }
    }else{
      res.send({
        msg : "User Not Found",
        status : 404
      })
    }


  // if (user) {
  //   res.status(200).json({
  //     message: "Login Successfully",
  //     response: {
  //       user,
  //       socialExit: 1
  //     }
  //   })
  // } else {
  //   res.status(200).json({
  //     message: "Username Does not exist",
  //     response: {
  //       socialExit: 0
  //     }
  //   })
  // }



  // if(user){
  //   res.send(user)
  // }else{
  //   res.send("Wrong Credintials")
  // }


  // .then(data => {
  //   res.send("Login Successful")
  //   res.send(data);
  // })
  // .catch(err => {
  //   res.send("Wrong Credintials")
  //   res.status(500).send({
  //     message:
  //       err.message || "Some error occurred "
  //   });
  // });

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};