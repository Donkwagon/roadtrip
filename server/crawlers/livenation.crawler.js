const express = require('express');
const crawler = express.Router();

var EVENT_COLLECTION = "events";
var ARTIST_COLLECTION = "artists";
var VENUE_COLLECTION = "venues";

var request =     require('request');
var cheerio =     require('cheerio');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36';

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

crawler.get("", function(req, res) {getVenue(15000);});

getVenue = function(id) {

    var URL = "https://api.livenation.com/venues/" + id + ".json";
    var req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
    
        req.get({url: URL,headers: {'User-Agent': USER_AGENT}},(error, response, body) =>{

            console.log(id + ": " + response.statusCode);

            if(response){
                if(error||response.statusCode != 200){
                    console.log(response.statusCode);
                }else{
                    body = JSON.parse(body);
                    if(body.data){
                        db.collection(VENUE_COLLECTION).insertOne(body.data,(err,doc)=>{
                            if(err){console.log(err)}
                            else{console.log("T");}
                        });
                    }
                }
            }

            id--
            getVenue(id);

        });
}

module.exports = crawler;