const express = require('express');
const artists = express.Router();
var ARTIST_COLLECTION = "artists";
var ObjectID = require('mongodb').ObjectID;

// var Artist = require('../models/Artist.model');

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

artists.get("", function(req, res) {
  db.collection(ARTIST_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get Artists.");
    } else {
      res.status(200).json(docs);
    }
  });
});

artists.get("/type/:complete", function(req, res) {
  db.collection(ARTIST_COLLECTION).find({complete: req.params.complete}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get Artists.");
    } else {
      res.status(200).json(docs);
    }
  });
});

artists.post("", function(req, res) {
  var newArtist = req.body;
  newArtist.createDate = new Date();
  console.log(req.body);

  db.collection(ARTIST_COLLECTION).insertOne(newArtist, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new Artist.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

artists.get("/:artistName", function(req, res) {
  db.collection(ARTIST_COLLECTION).findOne({ name: req.params.artistName }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get Artist");
    } else {
      res.status(200).json(doc);
    }
  });
});

artists.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(ARTIST_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update Artist");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

artists.delete("/:id", function(req, res) {
  db.collection(ARTIST_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete Artist");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = artists;