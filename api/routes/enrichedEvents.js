const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../config/check_auth");
const Project = require("../models/project");
const EnrichedEvent = require("../models/enrichedEvent");
const axios = require ('axios');

router.get("/:projectId/events/enriched",checkAuth,  (req, res, next) => {
    const projectId = req.params.projectId;
    console.log(projectId);
    EnrichedEvent.find({"projectId" :projectId})
        .exec()
        .then(docs => {
            console.log("like "+ projectId);
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



router.post("/:projectId/events/enriched", checkAuth,  (req, res, next) => {
    const enrichedEvent = new EnrichedEvent({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        projectId: req.params.projectId, //taking from url
        description: req.body.description,
        type: req.body.type,
        source: req.body.source,
        delimiter: req.body.delimiter,
        parentId: req.body.parentId,
        format: req.body.format,
        columns:req.body.columns,
        positions: req.body.positions,
        kafka: req.body.kafka,
        livy:req.body.livy
    });
    enrichedEvent.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Event stored",
                createdEvent: {
                    _id: result._id,
                    projectId: result.projectId,
                    name: result.name,
                    description: result.description,
                    type: result.type,
                    source: result.source,
                    delimiter: result.delimiter,
                    parentId: result.parentId,
                    columns:result.columns,
                    positions:result.positions,
                    format:result.format,
                    kafka:result.kafka,
                    livy:result.livy
                }
            });
        console.log(result.livy + "   livy_call& ")
        Project.findOneAndUpdate({ _id: result.projectId},
                { $push: { enrichedEvents:  result._id} })   
        axios.post("http://52.221.178.199:8998/batches",result.livy)
        .then(function (response) {
            console.log(response);
        })
        .then(axios.get("http://52.221.178.199:8998/batches/"),function (res) {
            console.log(res);
          })
        axios.post("http://52.221.178.199:8083/connectors",result.kafka)
        .then(function (response) {
            console.log(response);
          })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    });
});
    



router.get("/:projectId/event/enriched/:enrichedEventId", checkAuth, (req, res, next) => {
    const projectId = req.params.projectId;
    const id = req.params.enrichedEventId;
    console.log("---------" + projectId);
    Project.findById(projectId)
    .exec()
    .then(project =>{
    if(project) {
    EnrichedEvent.findById(id)
        .exec()
        .then(doc => {
            console.log("doc.projectId "+doc);
            if (doc.projectId == project.id) {
                res.status(200).json({
                    enrichedEvent: doc,
                })
            } else {
                res.status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
    } else if(project == null){
        res.status(400).json({
            message: "projectId is invalid"
        })
    }
}).catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    });
});
});



router.delete("/:projectId/event/enriched/:enrichedEventId", checkAuth, (req, res, next) => {
    const enrichedEventId = req.params.enrichedEventId;
    const projectId= req.params.projectId;
    console.log(enrichedEventId);
    console.log(projectId);
    Project.findOneAndUpdate({ _id: projectId},
            { $pull: { enrichedEvents:  enrichedEventId} })
    .exec()
    .then(project =>{
    if(project) {
        console.log("--------------");
        console.log(enrichedEventId);
      EnrichedEvent.remove({ _id: enrichedEventId })
        .exec()
        .then(result => {
            if (result.n === 0 ){
                return res.status(404).json({
                  message: "ID not found"
                })}else{
                    console.log(result);
                    res.status(200).json({
                    message: "event removed"});
                }
    })
    } else if(project == null){
        res.status(400).json({
            message: "projectId is invalid"
        })}
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
    console.log(projectId);
    console.log(name);
    Project.findById(projectId)
    .exec()
    .then(project =>{
    if(project) {
    EnrichedEvent.find({'name':name})
        .exec()
        .then(doc => {
            if (doc[0].projectId == project.id) {
                res.status(200).json({
                    enrichedEvent: doc,
                })
            } else {
                res.status(404)
                    .json({ message: "No valid entry found for provided ID" });
            } 
        })
    } else if(project == null){
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




module.exports = router;