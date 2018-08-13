const mongoose = require('mongoose');

const joinCondition = mongoose.Schema({
    firstEvent: { type: mongoose.Schema.Types.ObjectId, ref: 'EnrichedEvent', required: true },
    firstEventColumn: { type: String, required: true },
    secondEvent: { type: mongoose.Schema.Types.ObjectId, ref: 'EnrichedEvent', required: true },
    secondEventColumn: { type: String, required: true },
    condition: { type: String, enum: ["==", "<=", ">="], required: true }
})

const joinedEventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true, unique: true },
    joinConditions: [joinCondition]
});

module.exports = mongoose.model('JoinedEvent', joinedEventSchema);