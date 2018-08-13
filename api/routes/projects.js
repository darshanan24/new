const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../config/check_auth");
const Project = require("../models/project");

router.get("/projects/v1", checkAuth, (req, res, next) => {
    Project.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                projects: docs.map(doc => {
                    return {
                        projectName: doc.name,
                        description: doc.description,
                        dimensions: doc.dimensions,
                        rawEvents: doc.rawEvents,
                        enrichedEvents: doc.enrichedEvents,
                        customers: doc.customers,
                        dataSources: doc.dataSources,
                        description: doc.description,
                        joinedEvetns: doc.joinedEvents,
                        _id: doc._id
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get("/project/v1", checkAuth, (req, res, next) => {
    const name = req.query.name;
    Project.find({ 'name': name })
        .exec()
        .then(docs => {
            res.status(200).json({ project: docs });
        })
        .catch(err => {
            res.status(403).json({
                error: "FORBIDDEN:projectname doesnt exists"
            });
        });
});

router.post("/projects/v1", checkAuth, (req, res, next) => {
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        dimensions: req.body.dimensions,
        events: req.body.events,
        enrichedEvents: req.body.enrichedEvents,
        customers: req.body.customers,
        dataSources: req.body.dataSources
    });
    project
        .save()
        .then(result => {
            res.status(201).json({
                message: "Created project successfully",
                createdProject: {
                    name: result.name,
                    description: result.description,
                    _id: result._id,
                    rawEvents: result.rawEvents,
                    enrichedEvents: result.enrichedEvents,
                    dimensions: result.dimensions,
                    customers: result.customers,
                    dataSources: result.dataSources
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get("/project/v1/:projectId", checkAuth, (req, res, next) => {
    const id = req.params.projectId;
    Project.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    project: doc,
                });
            } else {
                res.status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


router.delete("/project/v1/:projectId", checkAuth, (req, res, next) => {
    const id = req.params.projectId;
    Project.remove({ _id: id })
        .exec()
        .then(result => {
            if (result.n === 0) {
                return res.status(404).json({ message: "ID not found" })
            } else {
                return res.status(200).json({ message: "event removed" })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});





router.post("/project/v1/:projectId/addEDC", checkAuth, (req, res, next) => {
    const id = req.params.projectId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Project.update({ _id: id }, { $push: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Project updated',
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;
