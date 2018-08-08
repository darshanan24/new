
const axios = require ('axios');
const data ={"file": "/home/centos/TestJars/livy.tester-1.0-SNAPSHOT.jar","name":"something", "className": "com.izac.Parser.IO", "args": ["-i", "{\"enrichedKafkaOptions\": {\"checkpointLocation\": \"/Users/vipulrajan/Desktop/checkpoints/DemoParser\", \"kafka.bootstrap.servers\": \"localhost:9092\", \"topic\": \"demoEnriched\"}, \"rejectedKafkaOptions\": {\"checkpointLocation\": \"/Users/vipulrajan/Desktop/checkpoints/DemoRejected\", \"kafka.bootstrap.servers\": \"localhost:9092\", \"topic\": \"demoRejected\"} }", "-p", "{\"optionName\": \"REGEXTOJSON\", \"schema\": [{\"position\": 0, \"name\": \"ipAddress\", \"type\": \"string\"}, {\"position\": 4, \"name\": \"address\", \"type\": \"string\"} ], \"regex\": \"(^(?:\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3})|-) (.*) (.*) \\\\[(\\\\d{2}/\\\\w{3}/\\\\d{4}(?:\\\\:\\\\d{2}){3} \\\\+\\\\d{4})\\\\] \\\"(.*)\\\" (\\\\d+|-) (\\\\d+|-) \\\"(.*)\\\" \\\"(.*)\\\"\", \"timeField\": {\"name\": \"datetime\", \"position\": 3, \"format\": \"dd/MMM/yyyy:HH:mm:ss xxxx\"}, \"kafkaOptions\": {\"kafka.bootstrap.servers\": \"localhost:9092\", \"subscribe\": \"demoRaw\", \"failOnDataLoss\": \"false\", \"auto.offset.reset\": \"earliest\"} }", "-s", "{\"master\":\"local[*]\", \"appName\":\"app1\", \"config\":{\"jvm.memory\":\"4g\"} }"]};

axios.post("http://52.221.178.199:8998/batches", data)
.then(function (res) {
  console.log(res);
})
.catch(function (err) {
console.log(err);
})
 
axios.get("http://52.221.178.199:8998/batches/")
.then(function (res) {
    console.log(res);
  })
  .catch(function (err) {
  console.log(err);
  }) 

axios.delete("http://52.221.178.199:8998/batches/14")
.then(function (res) {
    console.log(res);
  })
  .catch(function (err) {
  console.log(err);
  })

module.exports = axios;