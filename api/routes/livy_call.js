
const EnrichedEvent = require("../routes/enrichedEvents");
//const doSomething = require('../routes/doSomething.js')

var options = {
    "optionName": EnrichedEvent.doSomething,
    "schema": [],
    "regex": EnrichedEvent.doSomething,
    "timeField": {
      "name": EnrichedEvent.doSomething,
      "position":EnrichedEvent.doSomething,
      "format": EnrichedEvent.doSomething
    },
    "kafkaOptions": {
      "kafka.bootstrap.servers": "localhost:9092",
      "subscribe": "",
      "failOnDataLoss": "false",
      "auto.offset.reset": "earliest" 
    },
    "filters": [EnrichedEvent.doSomething]
  }
var result ="options"

/* function doSomething( options,result,(result),function(err){
  console.log(err);
}); */
  console.log(options);

 /* var enriched = EnrichedEvent.doSomething(projectId, options, (result) => {
  console.log(result);
  res.status(201).json({
      message: "Event stored",
  });
})
 console.log("enriched events "+ enriched); */
