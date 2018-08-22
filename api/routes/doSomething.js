
const mongoose = require("mongoose");
const Project = require("../models/project");
const EnrichedEvent = require("../models/enrichedEvent");

function doSomething(projectId, options, onSave) {
    const enrichedEvent = new EnrichedEvent({
        _id: mongoose.Types.ObjectId(),
        name: options.name,
        projectId: projectId,
        description: options.description,
        regex: options.regex,
        kafkaOptions: options.kafkaOptions,
        format: options.format,
        type: options.type,
        source: options.source,
        delimiter: options.delimiter,
        parentId: options.parentId,
        columns: options.columns,
        positions: options.positions,
        livy: options.livy,
        filters: options.filters,
        kafkaOptions: options.kafkaOptions
    });

    return enrichedEvent
        .save()
        .then(result => {
            onSave(result);

            return Project.findOneAndUpdate({
                _id: result.projectId
            }, {
                $push: {
                    enrichedEvents: result._id
                }
            });
        });
}
module.exports=doSomething;