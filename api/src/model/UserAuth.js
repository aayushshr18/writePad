const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstLogin:{
    type:Boolean,
    default:true
  },
  password:{
    type:String,
    required:true
  },
  community:{
    type:String
  },
  phone: { type: Number},
  profileType:{
    type:String,
    enum:['user','admin'],
    default:'user'
  },
  clientName:{
    type:String
  },
  businessName:{
    type:String
  },
  website:{
    type: Map,
    of: [String] // Array of strings (list of strings)
  },
  businessEmail:{
    type:String
  },
  businessNo:{
    type:String
  },
  businessAddress:{
    type:String
  },
  businessLogo:{
    type:String
  },
  brandColors:{
    type:Array
  },
  competitorSites:{
    type:Array
  },
  inspirationSites:{
    type:Array
  },
  forms:{
    type:Array,
  },
  createdDate: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
