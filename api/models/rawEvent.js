const mongoose = require('mongoose');

const rawEventSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    type: { type: String, required: true },
    source: { type:mongoose.Schema.Types.ObjectId, ref: 'DataSource',  required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
});

module.exports = mongoose.model('RawEvent', rawEventSchema);
