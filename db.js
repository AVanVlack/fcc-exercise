const mongoose = require('mongoose');
const shortid = require('shortid');


// Person schema
let userSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate},
  name: String
})

// Person model
let User = mongoose.model("User", userSchema)

// Exercise schema
let exerciseSchema = new mongoose.Schema({
  userId: {type: String, required: [true, 'userId is required']},
  description: {type: String, required: [true, 'description is required']},
  duration: {type: Number, required: [true, 'duration is required']},
  date: {type: Date, default: Date.now}
})

// Exercise model
let Exercise = mongoose.model("Exercise", exerciseSchema)

exports.User = User;
exports.Exercise = Exercise;