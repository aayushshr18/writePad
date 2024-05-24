const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComponentSchema = new Schema({
  websiteId: { type: String, required: true }, 
  seqNo: { type: Number, required: true },
  pageName: { type: String },
  components: [{
    type: { type: String }, 
    content: { type: String}, 
    width: { type: String, default: "100" }
  }]
});

const Component = mongoose.model('Component', ComponentSchema);
module.exports = Component;
