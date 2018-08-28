const mongoose = require('mongoose');

const positionDel = mongoose.Schema({
    startIndex: { type: Number, required: true },
    endIndex: { type: Number, required: false },
});

const Column = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["Description", "ID", "Time"], required: true },
    startIndex: { type: Number, required: true },
    endIndex: { type: Number, required: false },
    dataType: { type: String, enum: ["int", "float", "Double", "string"], required: true },
    oldName: { type: String, required: false },

});

 
const filters = mongoose.Schema({ 
    columns : {
        user_id : {type: String,required: true},
        product_value: {type: String,required: true}
    },
    expressions : { type: String, required: true }
})
const enrichedEventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    type: { type: String, enum: ["Enriched"], required: true },
    source: { type: String, required: true },
    DataSourceID: { type: String, required: false },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'RawEvent', required: true },
    delimiter: { type: String, required: true },
    format: { type: String, enum: ["JSON", "DELIMITED", "FixedWidth", "LOG","REGEXTOJSON"], required: true },
    columns: [Column],
    regex: { type: String, required: true},
    filters: [filters]
    
});

module.exports = mongoose.model('EnrichedEvent', enrichedEventSchema);