const mongoose = require('mongoose');

// let geoSchema = new mongoose.Schema({
// 	address: { type: String, trim: true, /* required: true,*/ default: "" },
// 	city: { type: String, trim: true, default: "" },
// 	country: { type: String, default: "" },
// 	street: { type: String, default: "" },
// 	state: { type: String, default: "" },
// 	postalCode: { type: String, default: "" },
// 	type: { type: String, default: "Point" },
// 	coordinates: { type: [Number], index: "2dsphere", default: [0, 0] }// [longitude, latitude]
// }, {
// 	_id: false
// });
const UserSchema = new mongoose.Schema({
    username : { type: String, trim: true },
    email : { type: String, trim: true },
    password: { type: String, trim: true },
    mobile : { type: String, trim: true },
    countryCode : { type:String, trim: true },
    //location: { type: geoSchema, default: {} },
    OTP : { type:String, trim: true },
});

module.exports = mongoose.model('user', UserSchema)