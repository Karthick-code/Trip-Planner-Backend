const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const travelPlanSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    startdate: { type: Date },
    enddate: { type: Date },
    destination: { type: String },
    budget: { type: Number },
    activities: { type: [String] },
    accomodation: { type: String },
    transportation: { type: String },
    notes: { type: String }
});

module.exports = mongoose.model('TravelPlan', travelPlanSchema);
