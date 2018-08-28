const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../config/check_auth");
const Project = require("../models/project");
const EnrichedEvent = require("../models/enrichedEvent");
//const axios = require('axios');
const doSomething = require('../routes/doSomething.js');
//const livy_call = require('../routes/livy_call');
const fs = require("fs");

router.get("/:projectId/events/enriched", checkAuth, (req, res, next) => {
    const projectId = req.params.projectId;
    EnrichedEvent.find({
            "projectId": projectId
        })
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                enrichedEvents: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        description: doc.description,
                        type: doc.type,
                        source: doc.source,
                        format: doc.format,
                        delimiter: doc.delimiter,
                        parentId: doc.parentId,
                        projectId: doc.projectId,
                        DataSource: doc.DataSource,
                        columns: doc.columns
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

function livy_call(result) {
    var request = {
        "optionName": "",
        "schema": [], // passing columns
        "regex": " ",
        "timeField": {
            "name": "",
            "position": "",
            "format": ""
        },
        "kafkaOptions": {
            "kafka.bootstrap.servers": "localhost:9092",
            "subscribe": "",
            "failOnDataLoss": "false",
            "auto.offset.reset": "earliest"
        },
        "filters": []
    }
    
    var obj = JSON.parse(result);
    // console.log(obj.columns.length);
    // console.log(obj.columns)
     var test = [];
    for(i=0;i<obj.columns.length;i++){
    test.push({
       name : obj.columns[i].name,
       startIndex : obj.columns[i].startIndex,
       endIndex:  obj.columns[i].endIndex,
       type: obj.columns[i].type
    })}
    console.log(test);
    request.schema=test;
    // request.timeField.name = test[0].name;
    request.timeField.format = "dd/MMM/yyyy:HH:mm:ss xxxx"
    request.filters = obj.filters;
    request.regex = obj.regex;
    request.optionName = obj.format;
    console.log(request);   
}


router.post("/:projectId/events/enriched", checkAuth, (req, res, next) => {
    return doSomething(req.params.projectId, req.body, (result) => {
            livy_call(JSON.stringify(result));
            res.status(201).json({
                message: "Event stored",
                createdEvent: {
                    _id: mongoose.Types.ObjectId(),
                    name: result.name,
                    projectId: result.projectId,
                    description: result.description,
                    regex: result.regex,
                    format: result.format,
                    type: result.type,
                    source: result.source,
                    delimiter: result.delimiter,
                    parentId: result.parentId,
                    columns: result.columns,
                    positions: result.positions,
                    filters: result.filters,
                }


            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});





router.get("/:projectId/event/enriched/:enrichedEventId", checkAuth, (req, res, next) => {
    const projectId = req.params.projectId;
    const id = req.params.enrichedEventId;
    Project.findById(projectId)
        .exec()
        .then(project => {
            if (project) {
                EnrichedEvent.findById(id)
                    .exec()
                    .then(doc => {
                        if (doc.projectId == project.id) {
                            res.status(200).json({
                                enrichedEvent: doc,
                            })
                        } else {
                            res.status(404)
                                .json({
                                    message: "No valid entry found for provided ID"
                                });
                        }
                    })
            } else if (project == null) {
                res.status(400).json({
                    message: "projectId is invalid"
                })
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
});



router.delete("/:projectId/event/enriched/:enrichedEventId", checkAuth, (req, res, next) => {
    const enrichedEventId = req.params.enrichedEventId;
    const projectId = req.params.projectId;
    Project.findOneAndUpdate({
            _id: projectId
        }, {
            $pull: {
                enrichedEvents: enrichedEventId
            }
        })
        .exec()
        .then(project => {
            if (project) {
                EnrichedEvent.remove({
                        _id: enrichedEventId
                    })
                    .exec()
                    .then(result => {
                        if (result.n === 0) {
                            return res.status(404).json({
                                message: "ID not found"
                            })
                        } else {
                            res.status(200).json({
                                message: "event removed"
                            });
                        }
                    })
            } else if (project == null) {
                res.status(400).json({
                    message: "projectId is invalid"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/:projectId/event/enriched", checkAuth, (req, res, next) => {
    const projectId = req.params.projectId;
    const name = req.query.name;
    Project.findById(projectId)
        .exec()
        .then(project => {
            if (project) {
                EnrichedEvent.find({
                        'name': name
                    })
                    .exec()
                    .then(doc => {
                        if (doc[0].projectId == project.id) {
                            res.status(200).json({
                                enrichedEvent: doc,
                            })
                        } else {
                            res.status(404)
                                .json({
                                    message: "No valid entry found for provided ID"
                                });
                        }
                    })
            } else if (project == null) {
                res.status(400).json({
                    message: "projectId is invalid"

                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
module.exports = router;