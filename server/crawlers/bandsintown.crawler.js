const express = require('express');
const crawler = express.Router();
var ARTIST_COLLECTION = "artists";
var ARTISTNAME_COLLECTION = "artist_names";
var EVENT_COLLECTION = "events";
var VENUE_COLLECTION = "venues";
var request =     require('request');
var cheerio =     require('cheerio');

var ObjectID = require('mongodb').ObjectID;
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36';

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

crawler.get("", (req, res) => {
    db.collection(ARTISTNAME_COLLECTION).find({}).toArray(function(err, docs) {
        if(err){console.log(err)}
        else{crawlerArtistPage(docs,0);}
    });
});

crawler.get("/rake", (req, res) => {rakeArtistList();});

crawler.get("/artistinfo", (req, res) => {getArtistInfo();});

crawler.get("/upcomingevents", (req, res) => {
    db.collection(ARTIST_COLLECTION).find({"upcoming_event_count":{"$gte":1}}).toArray((err, docs) => {
        if(err){console.log(err);}
        else{
            getUpcomingEvents(docs, 0);
        }
    });
});

crawlerArtistPage = function(list,i) {
    if(i < list.length){
        var username = list[i].username;

        var URL = "http://bandsintown.com/" + username;
        var req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
        req.get({url: URL,headers: {'User-Agent': USER_AGENT}},function(error, response, html){
            console.log(username);
            if(error||response.statusCode != 200){console.log(error);}
            else{
                console.log(response.statusCode);
                var $ = cheerio.load(html);
                $('.content-container').each((i, el) => {
                    
                    if($("header", this)){
                        var artists = [];
                        $("a", this).each(function(index, element){
                            var name = $(this).attr("href").split("/")[1];
                            artists.push({username: name,crawled:false});
                        });

                        artists.forEach(el => {
                            db.collection(ARTISTNAME_COLLECTION).find({username:el.username}).toArray((err, docs)=>{
                                if(err){console.log(err);}
                                else{
                                    if(docs.length == 0){
                                        db.collection(ARTISTNAME_COLLECTION).insertOne(el, (err, doc) => {
                                            err?console.log(err):0;
                                        });
                                    }
                                    if(docs.length > 1){
                                        db.collection(ARTISTNAME_COLLECTION).remove({username:el.username}, (err, result) => {
                                            err?console.log(err):0;
                                        });
                                        db.collection(ARTISTNAME_COLLECTION).insertOne(el,(err, doc) => {
                                            err?console.log(err):0;
                                        });
                                    }
                                }
                            });  
                        })
                    }
                });
                i++;
                crawlerArtistPage(list,i);
            }
        });
    }
}

getArtistInfo = function(username) {

    db.collection(ARTISTNAME_COLLECTION).find({crawled:false}).toArray(function(err, docs) {
        if(err){console.log(err)}
        else{getArtistData(docs,0);}
    });
}

getArtistData = function(list, i) {
    if(i < list.length){
        var username = list[i].username;
        console.log(username);
        var URL = "https://rest.bandsintown.com/artists/" + username + "?app_id=genre_explorer";
        var req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
        req.get({url: URL,headers: {'User-Agent': USER_AGENT}}, (error, response, data) => {
            data = JSON.parse(data);
            db.collection(ARTIST_COLLECTION).insertOne(data,(err,doc)=>{
                if(err){console.log(err)}
                else{
                    db.collection(ARTISTNAME_COLLECTION).update({username:username},{$set: {"crawled":true}},(err, doc) => {
                        err?console.log(err):0;
                        i++;
                        getArtistData(list,i);
                    });
                }
            });

        });
    }

}

rakeArtistList = function() {
    //remove redundancy in artist names collection

    // db.collection(ARTISTNAME_COLLECTION).aggregate([{$group:{_id:"$username", dups:{$push:"$_id"}, count: {$sum: 1}}},
    //     {$match:{count: {$gt: 1}}}
    //     ]).forEach(function(doc){
    //     doc.dups.shift();
    //     db.collection(ARTISTNAME_COLLECTION).remove({_id : {$in: doc.dups}});
    // });

    //map crawled artists to the artist names collection
    //remove redundancy in artists collection
    // db.collection(ARTIST_COLLECTION).aggregate([{$group:{_id:"$id", dups:{$push:"$_id"}, count: {$sum: 1}}},
    //     {$match:{count: {$gt: 1}}}
    //     ]).forEach(function(doc){
    //     doc.dups.shift();
    //     db.collection(ARTIST_COLLECTION).remove({_id : {$in: doc.dups}});
    // });
    db.collection(EVENT_COLLECTION).aggregate([{$group:{_id:"$id", dups:{$push:"$_id"}, count: {$sum: 1}}},
        {$match:{count: {$gt: 1}}}
        ]).forEach(function(doc){
        doc.dups.shift();
        db.collection(EVENT_COLLECTION).remove({_id : {$in: doc.dups}});
    });
    // db.collection(VENUE_COLLECTION).aggregate([{$group:{_id:"$bc_id", dups:{$push:"$_id"}, count: {$sum: 1}}},
    //     {$match:{count: {$gt: 1}}}
    //     ]).forEach(function(doc){
    //     doc.dups.shift();
    //     db.collection(VENUE_COLLECTION).remove({_id : {$in: doc.dups}});
    // });

    // db.collection(VENUE_COLLECTION).aggregate([{$group:{_id:"$id", dups:{$push:"$_id"}, count: {$sum: 1}}},
    //     {$match:{count: {$gt: 1}}}
    //     ]).forEach(function(doc){
    //     doc.dups.shift();
    //     db.collection(VENUE_COLLECTION).remove({_id : {$in: doc.dups}});
    //});

    // var stream_venues = db.collection(EVENT_COLLECTION).find({}).stream();

    // var venues = [];

    // stream_venues.on('data', function(doc) {
    //     venues.push(doc.venue);
    // });
    // stream_venues.on('error', function(err) {
    //     console.log(err);
    // });
    // stream_venues.on('end', function() {
    //     console.log('All done!');
    //     console.log(venues.length);
    //     var index = 0;
    //     var len = venues.length;
    //     while(index < len){
    //         var venue = venues[index];
    //         var i = 0;
    //         while(i < len){
    //             if(venues[i].latitude == venue.latitude && venues[i].longitude == venue.longitude && i != index){
    //                 venues.splice(i,1);
    //                 len--;
    //                 i++;
    //             }else{
    //                 i++;
    //             }
    //         }
    //         index++;
    //     }
    //     console.log(venues.length);
    //     db.collection(VENUE_COLLECTION).insertMany(venues,(err,doc)=>{
    //         if(err){console.log(err)}
    //     });
        
    // });

    // var stream_artists = db.collection(ARTIST_COLLECTION).find({}).stream();


    // stream_artists.on('data', function(doc) {
    //     console.log(typeof(doc));
    //     const query = {
    //         text: 'INSERT INTO artists(name, img_url, img_url_thumb, source, created_at, updated_at, num_fans) VALUES($1, $2, $3, $4, $5, $6, $7)',
    //         values: [
    //             doc.name,
    //             doc.image_url,
    //             doc.thumb_url,
    //             "bandsintown",
    //             new Date(),
    //             new Date(),
    //             parseInt(doc.tracker_count)
    //         ],
    //     }
        
    //     // callback
    //     pgClient.query(query, (err, res) => {
    //         if (err) {
    //             console.log(err.stack)
    //         } else {
    //             console.log(res.rows[0])
    //         }
    //     })
    // });
    // stream_artists.on('error', function(err) {
    //     console.log(err);
    // });
    // stream_artists.on('end', function() {
    //     console.log('All done!');
    // });

    // db.collection(ARTIST_COLLECTION).find({}).toArray((err, docs) => {
    //     if(err){console.log(err);}
    //     else{
    //         updateCrawledArtistName(docs, 0);
    //     }
    // });
}

updateCrawledArtistName = function(list, i) {
    if(i < list.length){
        var el = list[i];
        db.collection(ARTISTNAME_COLLECTION).update({username:el.name},{$set: {"crawled":true}},(err, doc) => {
            if(err){console.log(err);}
            else{
                console.log(el.name);
                i++;
                updateCrawledArtistName(list,i);
            }
        });
    }
}

getUpcomingEvents = function(list, i) {
    if(i < list.length){
        var username = list[i].name;
        console.log(username);
        var URL = "https://rest.bandsintown.com/artists/" + username + "/events?app_id=genre_explorer";
        var req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
        req.get({url: URL,headers: {'User-Agent': USER_AGENT}}, (error, response, data) => {
            console.log(response.statusCode);
            if(response.statusCode != 200){
                console.log(response);
            }else{
                data = JSON.parse(data);
                db.collection(EVENT_COLLECTION).insertMany(data,(err,doc)=>{
                    if(err){console.log(err)}
                });
            }
                
            i++;
            getUpcomingEvents(list,i);
        });
    }
}

module.exports = crawler;