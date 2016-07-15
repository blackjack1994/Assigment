/**
 * Created by SAGAR on 7/12/2016.
 */
var Fual = require('./../model/fual');
var mongoose = require('mongoose');
var config = require('../config');
var Counter = require('../model/dumbSchema');
function apiHelper(req,res,str){
    var __bool = req.query['id'];
    var queryType = req.query['paramType'];
    var queryParam = req.query['paramVal'];
    //console.log(__bool);
    if(queryType=='less'){
        Fual.find({}).where(str).lt(queryParam).sort({str:__bool}).exec(function(err,user){
            if(err)
                res.send(err);
            else{
                res.send(user);
            }
        });
    }
    else if(queryType=='great'){
        Fual.find({}).where(str).gt(queryParam).sort({str:__bool}).exec(function(err,user){
            if(err)
                res.send(err);
            else
                res.send(user);
        });
    }
    else if(queryType=='equal'){
        Fual.find({}).where(str).equals(queryParam).sort({str:__bool}).exec(function(err,user){
            if(err)
                res.send(err);
            else
                res.send(user);
        });
    }
    else {
        if(str=='_id'){
            Fual.find({}).sort({'_id':__bool}).exec(function(err,user){
                if(err)
                    res.send(err);
                else
                    res.send(user);
            });
        }
        else if(str=='distance'){
            Fual.find({}).sort({'distance':__bool}).exec(function(err,user){
                if(err)
                    res.send(err);
                else
                    res.send(user);
            });
        }
        else if(str=='fual'){
            Fual.find({}).sort({'fual':__bool}).exec(function(err,user){
                if(err)
                    res.send(err);
                else
                    res.send(user);
            });
        }
        else if(str=='milage'){
            Fual.find({}).sort({'milage':__bool}).exec(function(err,user){
                if(err)
                    res.send(err);
                else
                    res.send(user);
            });
        }
    }
}
module.exports =  function(app, express){
  var api = express.Router();
  api.post('/fualdata', function(req, res){
      Counter.findOneAndUpdate({ "key":'key'},{ $inc:{count: 1 }},{ "new" : true}, function (err, counter) {
          if (err){}
          else{
              var  fual = new Fual({
                  fual:req.body.fual,
                  distance:req.body.distance,
                  milage:req.body.milage,
                  _id:counter.count
              });
              fual.save(function(err){
                  if(err){
                      res.send(err);
                  }
                  else res.json({message:'query sucesss'});
              });
          }
      })
  });
 api.get('/id', function(req,res){
        apiHelper(req,res,'_id');
     });
    api.get('/fual', function(req,res){
        apiHelper(req,res,'fual');
    });
    api.get('/distance', function(req,res){
        apiHelper(req,res,'distance');
    });
    api.get('/milage', function(req,res){
        apiHelper(req,res,'milage');
    });
    api.get('/clear', function(req,res){
       Counter.remove({}, function(){});
       new Counter({key:'key',count:0}).save();
       Fual.remove({}, function(err){
           if(err)
               res.json({message:'failed'});
           else
               res.json({message:'data remove succesfully'});
       });
    });
 return api;
};
