/**
 * Created by SAGAR on 7/12/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
mongoose.connect(config.database , function(err, db){
   if(err)
        console.log(err);
    else
       console.log('connected to datbase');
})
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.use(morgan('dev'));

app.use('/app', express.static(__dirname));
var api = require('./api/api')(app,express);
app.use('/api',api);


app.get('*',function(req,res){
    //console.log(__dirname);
   res.sendFile(__dirname+'/app/html/index.html');
});

app.listen(config.port,function(err, res){
   if(err)
        console.log(err);
   else
    console.log("server is up on runing!!");
});
