const mongoose = require("mongoose");
const accomodationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    
    description: {
        type: String,
        required: true,
    },
    amenities: {
        type: [String],
        required: true,
    }
})
const Accomodation = mongoose.model("Accomodation", accomodationSchema);
module.exports = Accomodation;
    
    