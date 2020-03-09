var express = require('express');
var bodyParser = require ('body-parser');
var app = express();
var index=require('./index.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
index(app);
app.listen(3000 , ()=>{
    console.log('server is running at 3000');
});
