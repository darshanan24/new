const mongoose = require('mongoose');

const Metric = mongoose.Schema({
    Name: String,
    ColoumnName: String,
    GroupBy: String,
    Function: { type: String, enum: ["Max", "Min", "Sum", "Avg", "Distinct", "TopN"] },
    Window: Number,
    Delay: Number
})
const EventMetric = mongoose.Schema({
    CustomerField: String,
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'EnrichedEvent' },
    Metrics: [Metric]
})
const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: { type: String, required: true, unique: true },
    EventMetrics: [EventMetric]
});

module.exports = mongoose.model('Profile', profileSchema);

