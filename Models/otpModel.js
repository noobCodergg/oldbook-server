const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  name:String,
  email: String,
  phone:String,
  social:String,
  address : String,
  password : String,
  role:String,
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 40 
  },
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 });

const Otp = mongoose.model("otps", otpSchema);
module.exports = Otp;