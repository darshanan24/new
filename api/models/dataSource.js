const mongoose = require('mongoose');


const dataSourceSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    config: { type: mongoose.Schema.Types.Mixed, required: true }

});
module.exports = mongoose.model('DataSource', dataSourceSchema);

