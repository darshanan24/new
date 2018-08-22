const mongoose = require('mongoose');

const positionDel = mongoose.Schema({
    startIndex: { type: Number, required: true },
    endIndex: { type: Number, required: false },
});
const positionFixed = mongoose.Schema({
    startIndex: { type: Number, required: true },
    endIndex: { type: Number, required: true },
});

const Column = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["Description", "ID", "Time"], required: true },
    positions: [positionDel], // Position is a inbuilt function, so used position
    dataType: { type: String, enum: ["int", "float", "Double", "string"], required: true },
    oldName: { type: String, required: false },

});

const enrichedKafkaOptions = mongoose.Schema({
    enrichedKafkaOptions: {
   checkpointLocation: {type: String,required: true},
   kafka_bootstrap_servers : {type: String,required: true},
   topic : {type: String,required: true}
 },
 rejectedKafkaOptions:
 {
   checkpointLocation: {type: String,required: true},
   kafka_bootstrap_servers: {type: String,required: true},
   topic: {type: String,required: true},
 }
}) 



const livy_schema = mongoose.Schema({
    file: {type: String,
        default: function() {
            return { data: '/home/centos/TestJars/livy.tester-1.0-SNAPSHOT.jar', info: 'file path' }
          }
    },
    name: {type: String,required: true},
    className: { type: String, required: true},
    args: [ enrichedKafkaOptions] 
  });

/* const kafka_schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: false },
    config: { type: mongoose.Schema.Types.Mixed, required: true }
}); */
/* const filter_columns= mongoose.Schema({
    user_id : {type: String,required: true},
    product_value: {type: String,required: true}
}) */
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
    livy: [livy_schema],
    regex: { type: String, required: true},
    filters: [filters],
    timeFormat:{ type: String, required: false},
    kafkaOptions: {
        kafka_bootstrap_servers: { type: String, required: true},
        subscribe: { type: String, required: true},
        failOnDataLoss: { type: String, required: true},
        auto_offset_reset: { type: String, required: true}
    }
});

module.exports = mongoose.model('EnrichedEvent', enrichedEventSchema);