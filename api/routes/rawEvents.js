const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//JWT token (authorisation)
const checkAuth = require("../../config/check_auth");
//schema models to follow
const Project = require("../models/project");
const RawEvent = require("../models/rawEvent");

//handling get requests
router.get("/:projectId/events/raw", checkAuth, (req, res, next) => {
    const projectId = req.params.projectId;
    RawEvent.find({ "projectId": projectId })
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                rawEvents: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        description: doc.description,
                        type: doc.type,
                        source: doc.source,
                        projectId: doc.projectId
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


router.post("/:projectId/events/raw", checkAuth, (req, res) => {
    const rawEvent = new RawEvent({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        source: req.body.source,
        projectId: req.params.projectId
    });
    return rawEvent.save()

        .then(result => {
            res.status(201).json({
                message: "Created RAW EVENT successfully",
                createdRawEvent: {
                    name: result.name,
                    description: result.description,
                    type: result.type,
                    source: result.source,
                    _id: result._id,
                    projectId: result.projectId
                }
            });
            Project.findOneAndUpdate({ _id: result.projectId },
                { $push: { rawEvents: result._id } },
                function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                    }
                });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});



router.get("/:projectId/event/raw/:rawEventId", checkAuth, (req, res, next) => {
    const projectId = req.params.projectId;
    const id = req.params.rawEventId;
    Project.findById(projectId)
        .exec()
        .then(projectId => {
            if (projectId) {
                RawEvent.findById(id)
                    .exec()
                    .then(doc => {
                        if (doc.projectId == projectId.id) {
                            res.status(200).json({
                                rawEvent: doc,
                            })
                        } else {
                            res.status(404)
                                .json({ message: "No valid entry found for provided ID" });
                        }
                    })
            } else if (projectId == null) {
                res.status(400).json({
                    message: "projectId is invalid"
                })
            }
        })
});

router.delete("/:projectId/event/raw/:rawEventId", checkAuth, (req, res, next) => {
    const rawEventId = req.params.rawEventId;
    const projectId = req.params.projectId;
    Project.findOneAndUpdate({ _id: projectId },
        { $pull: { rawEvents: rawEventId } })
        .exec()
        .then(project => {
            if (project) {
                RawEvent.remove({ _id: rawEventId })
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
            } else if (projectId == null) {
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



router.get("/:projectId/event/raw", checkAuth, (req, res, next) => {
    const projectId = req.params.projectId;
    const name = req.query.name;
    Project.findById(projectId)
        .exec()
        .then(project => {
            if (project) {
                RawEvent.find({ 'name': name })
                    .exec()
                    .then(doc => {
                        if (doc[0].projectId == project.id) {
                            res.status(200).json({
                                rawEvent: doc,
                            })
                        } else {
                            res.status(404)
                                .json({ message: "No valid entry found for provided ID" });
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