const express = require('express');
const events = express.Router();
var EVENT_COLLECTION = "events";
var ObjectID = require('mongodb').ObjectID;

// var event = require('../models/event.model');

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

events.get("", function(req, res) {
  db.collection(EVENT_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get events.");
    } else {
      res.status(200).json(docs);
    }
  });
});

events.get("/artist/:artistId", function(req, res) {
    console.log(req.params.artistId);
    db.collection(EVENT_COLLECTION).find({artist_id: req.params.artistId}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get events.");
        } else {
            res.status(200).json(docs);
        }
    });
});

events.post("", function(req, res) {
  var newevent = req.body;
  newevent.createDate = new Date();
  console.log(req.body);

  db.collection(EVENT_COLLECTION).insertOne(newevent, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new event.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

events.get("/:eventName", function(req, res) {
  db.collection(EVENT_COLLECTION).findOne({ name: req.params.eventName }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get event");
    } else {
      res.status(200).json(doc);
    }
  });
});

events.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(EVENT_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update event");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

events.delete("/:id", function(req, res) {
  db.collection(EVENT_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete event");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = events;