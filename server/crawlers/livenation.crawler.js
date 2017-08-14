const express = require('express');
const crawler = express.Router();
var EVENT_COLLECTION = "events";
var ARTIST_COLLECTION = "artists";
var request =     require('request');
var cheerio =     require('cheerio');

var ObjectID = require('mongodb').ObjectID;

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

crawler.get("", function(req, res) {
    var artist = "GunsN'Roses";
    var root = "http://bandsintown.com/";
    var URL = root + artists;
    var UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36';
    var req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});

    req.get({url: URL,headers: {'User-Agent': UserAgent}},(error, response, html) =>{

        if(error||response.statusCode != 200){
            
            console.log(response);

        }else{

            console.log(html);

        }
    });



});

module.exports = crawler;