const User = require('./User');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },   
    transportation: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    date: { type: Date, required: true },
        
});
module.exports = mongoose.model('Booking', bookingSchema);