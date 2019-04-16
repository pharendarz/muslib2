const express = require('express');

//<<post dependencies
const bodyParser = require('body-parser');
//>>

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes/getRoutes')(app);

app.listen(4000);
console.clear();
console.log(`====server is running====`);