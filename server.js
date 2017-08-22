var express =         require("express");
var bodyParser =      require("body-parser");
var mongoose =        require('mongoose');
var http =            require('http');

//////////////////////////////////////////
//Connect to postgre database
const { Client } = require('pg');
const pgClient = new Client({
    user: 'Donkw',
    host: 'rodie.ckeovenu9w7r.us-east-1.rds.amazonaws.com',
    database: 'rodie',
    password: 'Idhap007',
    port: 5432,
})

pgClient.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
});
  
global.pgClient = pgClient;

// pgClient.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     pgClient.end()
// })

//////////////////////////////////////////
//Initialize app and start express server
var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

const server = http.createServer(app);

server.listen(process.env.PORT || 8080, function (err) {
    if (err) {console.log(err);process.exit(1);}
    var port = server.address().port;
    console.log("App now running on port",port);
});

//////////////////////////////////////////
//Connect to mongoose db
const MongoDbConStr = "mongodb://donkw:Idhap007@ds027699.mlab.com:27699/heroku_zmh0v7fk";

global.db = mongoose.createConnection(MongoDbConStr);

//////////////////////////////////////////
//Connect to io
// var io = require('socket.io').listen(server.listen(8100));
// io.sockets.on('connection',(socket) => {console.log('client connect');});
// global.io = io;

//////////////////////////////////////////
//Routing
const apis =         require('./server/apis');
app.use('/apis',apis);

module.exports = app;