const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
//<<post dependencies
const bodyParser = require('body-parser');
//db
require('./mongoModels/Albums');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();
const appPort = 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes/getRoutes')(app);

app.listen(appPort);
console.clear();
console.log(`====server is running at port ${appPort}====`);