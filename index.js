const express = require('express');

const mongoose = require('mongoose');

//app keys

const keys = require('./config/keys');
//<<post dependencies
const bodyParser = require('body-parser');
//db
require('./mongoModels/Albums');
// nodemon({ script: 'index.js' }).on('start', function () {
//     console.log('nodemon started');
// })
console.clear();
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const app = express();
const appPort = 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes/getRoutes')(app);

app.listen(appPort);
console.clear();
console.log(`====server is running at port ${appPort}====`);