const mongoose = require('mongoose');


const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    dimensions: { type: [], required: false },
    rawEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RawEvent' }],
    enrichedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EnrichedEvent' }],
    customers: { type: [], required: false },
    dataSources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DataSource' }],
    joinedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JoinedEvent' }]
});

module.exports = mongoose.model('Project', projectSchema);
