const express = require('express');
const users = express.Router();
var USER_COLLECTION = "users";
var ObjectID = require('mongodb').ObjectID;

// var user = require('../models/user.model');

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

users.get("", function(req, res) {
  db.collection(USER_COLLECTION).find({}).sort( { tracker_count: -1 } ).limit(20).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get users.");
    } else {
      res.status(200).json(docs);
    }
  });
});

users.get("/type/:complete", function(req, res) {
  db.collection(USER_COLLECTION).find({complete: req.params.complete}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get users.");
    } else {
      res.status(200).json(docs);
    }
  });
});

users.post("", function(req, res) {
  var newuser = req.body;
  newuser.createDate = new Date();
  console.log(req.body);

  db.collection(USER_COLLECTION).insertOne(newuser, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new user.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

users.get("/:userName", function(req, res) {
  db.collection(USER_COLLECTION).findOne({ name: req.params.userName }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get user");
    } else {
      res.status(200).json(doc);
    }
  });
});

users.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(USER_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update user");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

users.delete("/:id", function(req, res) {
  db.collection(USER_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete user");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = users;