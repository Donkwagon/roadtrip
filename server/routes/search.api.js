const express = require('express');
const search = express.Router();
var ARTIST_COLLECTION = "artists";
var ObjectID = require('mongodb').ObjectID;

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

search.get("/:query", function(req, res) {
  
  db.collection(ARTIST_COLLECTION).find( { $text: { $search: req.params.query } }).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get artists.");
    } else {
      res.status(200).json(docs);
    }
  });
});


module.exports = search;