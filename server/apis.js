const express =   require('express');
var app =         express();

const apis = express.Router();

/////////////////////////////////////
//Keepers
const bandsintown =         require('./crawlers/bandsintown.crawler');
const livenation =         require('./crawlers/livenation.crawler');

apis.use('/crawlers/bandsintown', bandsintown);
apis.use('/crawlers/livenation', livenation);

const search =         require('./routes/search.api');

apis.use('/search', search);


module.exports = apis;