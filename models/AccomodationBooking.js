const mongoose = require('mongoose');
const User = require('./User');

const accomodationBookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    checkInDate: Date,
    checkOutDate: Date,
    numberOfGuests: Number,
    // Additional fields as needed
});

const AccomodationBooking = mongoose.model('AccomodationBooking', accomodationBookingSchema);

module.exports = AccomodationBooking;