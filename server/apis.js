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
const artist =         require('./routes/artist.api');
const event =         require('./routes/event.api');
const user =         require('./routes/user.api');

apis.use('/search', search);
apis.use('/artist', artist);
apis.use('/event', event);
apis.use('/user', user);


module.exports = apis;