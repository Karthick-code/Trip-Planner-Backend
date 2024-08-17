const mongoose = require("mongoose");
const DestinationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  reference:{
    type:String
  },
  rating:{
    type:String,
    required:true,
  }
});
module.exports = mongoose.model("Destination", DestinationSchema);