const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../config/check_auth");

const Project = require("../models/project");
const JoinedEvent = require("../models/joinedEvent");
const EnrichedEvent = require("../models/enrichedEvent");

router.get("/:projectId/events/joinedEvents", checkAuth, (req, res, next) => {
    const projectId = req.params.projectId;
    JoinedEvent.find({ "projectId": projectId })
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                joinedEvents: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        projectId: doc.projectId,
                        joinConditions: doc.joinConditions
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



router.post("/:projectId/events/joinedEvents", checkAuth, (req, res, next) => {
    const joinedEvent = new JoinedEvent({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        projectId: req.params.projectId, //taking from url
        joinConditions: req.body.joinConditions

    });

    return joinedEvent.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Event stored",
                createdEvent: {
                    _id: result._id,
                    projectId: result.projectId,
                    name: result.name,
                    joinConditions: result.joinConditions
                }
            });
            Project.findOneAndUpdate({ _id: result.projectId },
                { $push: { joinedEvents: result._id } },
                function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
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

router.get("/:projectId/events/joinedEvent/:joinedEventId", checkAuth, (req, res, next) => {
    const projectId = req.params.projectId;
    const id = req.params.joinedEventId;
    Project.findById(projectId)
        .exec()
        .then(project => {
            if (project) {
                JoinedEvent.findById(id)
                    .exec()
                    .then(doc => {
                        if (doc.projectId == project.id) {
                            res.status(200).json({
                                joinedEvent: doc,
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
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.delete("/:projectId/events/joinedEvent/:joinedEventId", checkAuth, (req, res, next) => {
    const projectId = req.params.projectId;
    const joinedEventId = req.params.joinedEventId;
    Project.findOneAndUpdate({ _id: projectId },
        { $pull: { joinedEvents: joinedEventId } })
        .exec()
        .then(project => {
            if (project) {
                JoinedEvent.remove({ _id: joinedEventId })
                    .exec()
                    .then(result => {
                        if (result.n === 0) {
                            return res.status(404).json({
                                message: "ID not found"
                            })
                        } else {
                            console.log(result);
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


router.get("/:projectId/events/joinedEvent", checkAuth, (req, res, next) => {
    const projectId = req.params.projectId;
    const name = req.query.name;
    Project.findById(projectId)
        .exec()
        .then(project => {
            if (project) {
                JoinedEvent.find({ 'name': name })
                    .exec()
                    .then(doc => {
                        if (doc[0].projectId == project.id) {
                            res.status(200).json({
                                joinedEvent: doc,
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
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



module.exports = router;