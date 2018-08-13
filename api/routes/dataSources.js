const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../config/check_auth");
//schema models to follow
const Project = require("../models/project");
const DataSource = require("../models/dataSource");


router.get("/:projectId/datasources", checkAuth, (req, res, next) => {
    const projectId = req.params.projectId;
    DataSource.find({ "projectId": projectId })
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                count: docs.length,
                dataSource: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        type: doc.type,
                        config: doc.config,
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


router.post("/:projectId/datasources", checkAuth, (req, res) => {
    const dataSource = new DataSource({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        type: req.body.type,
        config: req.body.config,
        projectId: req.params.projectId
    });
    return dataSource.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created DATASOURCE successfully",
                createdDataSource: {
                    name: result.name,
                    type: result.type,
                    _id: result._id,
                    config: result.config,
                    projectId: result.projectId
                }
            });
            Project.findOneAndUpdate({ _id: result.projectId },
                { $push: { dataSources: result._id } },
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



router.get("/:projectId/datasource/:datasourceId", checkAuth, (req, res, next) => {
    const projectId = req.params.projectId;
    const id = req.params.datasourceId;
    Project.findById(projectId)
        .exec()
        .then(project => {
            if (project) {
                DataSource.findById(id)
                    .exec()
                    .then(doc => {
                        if (doc.projectId == project.id) {
                            res.status(200).json({
                                dataSource: doc,
                            })
                        } else {
                            res.status(404)
                                .json({ message: "No valid entry found for provided  ProjectID" });
                        }
                    })
            } else if (project == null) {
                res.status(400).json({
                    message: "projectId is invalid"
                })
            }
        })
});




router.get("/:projectId/datasource", checkAuth, (req, res, next) => {
    const projectId = req.params.projectId;
    const name = req.query.name;
    Project.findById(projectId)
        .exec()
        .then(project => {
            if (project) {
                DataSource.find({ 'name': name })
                    .exec()
                    .then(doc => {
                        if (doc[0].projectId == project.id) {
                            res.status(200).json({
                                dataSource: doc,
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



router.delete("/:projectId/datasource/:datasourceId", checkAuth, (req, res, next) => {
    const datasourceId = req.params.datasourceId;
    const projectId = req.params.projectId;
    Project.findOneAndUpdate({ _id: projectId },
        { $pull: { dataSources: datasourceId } })
        .exec()
        .then(project => {
            if (project) {
                DataSource.remove({ _id: datasourceId })
                    .exec()
                    .then(result => {
                        if (result.n === 0) {
                            return res.status(404).json({
                                message: "ID not found"
                            })
                        } else {
                            res.status(201).json({
                                message: "DataSource removed"
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
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;