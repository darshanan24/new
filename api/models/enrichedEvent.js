const mongoose = require('mongoose');

const positionDel = mongoose.Schema({
    startIndex: { type: Number, required: true },
    endIndex: { type: Number, required: false },
}); 
const positionFixed = mongoose.Schema({
    startIndex: { type: Number, required: true },
    endIndex: { type: Number, required: true},
}); 

const Column = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["Description","ID","Time"], required: true },
    positions: [positionDel || positionFixed ], // Position is a inbuilt function, so used position
    dataType: { type: String, enum: ["int", "float", "Double","String"], required: true },
    oldName: {type:String, required: false }
});

const livy_schema = mongoose.Schema({
    file: { type: String,required:true},
    name: { type:String, required:true },
    className: {type:String, required: true},
    args: [{type:mongoose.Schema.Types.Mixed, required:true}]
});

const kafka_schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: false },
    config: {type:mongoose.Schema.Types.Mixed, required: true}
});


const enrichedEventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true,unique: true },
    description: { type: String, required: false },
    type: { type: String, enum: ["Enriched"], required: true },
    source: { type: String, required: true },
    DataSourceID: { type: String, required: false},
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'RawEvent', required: true},
    delimiter: { type: String, required: true },
    format: {type:String, enum:["JSON","DELIMITED","FixedWidth","LOG"], required: true},
    columns:[Column],
    kafka: [kafka_schema],
    livy:[livy_schema]
});

module.exports = mongoose.model('EnrichedEvent', enrichedEventSchema);