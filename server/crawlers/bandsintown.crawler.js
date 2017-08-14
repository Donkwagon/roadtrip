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
    var URL = root + artist;
    var UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36';
    var req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});

    req.get({url: URL,headers: {'User-Agent': UserAgent}},(error, response, html) =>{

        if(error||response.statusCode != 200){
            
            console.log(response);
            res.status(response.statusCode).json(html);

        }else{

            console.log(html);
            res.status(response.statusCode).json(html);

            var $ = cheerio.load(html);
            $('tr .events-table').each(function(i, el) {
                //asssuming the first two key words in this meta tag is always ticker and security name for article page
                $(".date",this).text()
            });


        }
    });



});

module.exports = crawler;