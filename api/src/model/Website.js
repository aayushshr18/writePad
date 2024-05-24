const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebsiteSchema = new Schema({
  userId: { type: String, required: true },
  websiteName: { type: String, required: true },
  about:{ type: String},
  url:{ type: String },
  imageURL:{ type: String },
  websiteCategory: { type: String },
  websiteBody: {
    type: Array
  },
  createdDate: { type: Date, default: Date.now() },
  updatedDate: { type: Date, default: Date.now() }

});

const Website = mongoose.model('Website', WebsiteSchema);
module.exports = Website;
