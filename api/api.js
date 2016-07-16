/**
 * Created by SAGAR on 7/12/2016.
 */
var Fuel = require('./../model/fuel');
var mongoose = require('mongoose');
var config = require('../config');
var Counter = require('../model/dumbSchema');
function apiHelper(req,res,str){

    var __bool = req.query['id'];
    var queryType = req.query['paramType'];
    var queryParam = req.query['paramVal'];

    if(queryType=='less'){
        Fuel.find({}).where(str).lt(queryParam).sort({str:__bool}).exec(function(err,user){
            if(err)
                res.send(err);
            else{
                res.send(user);
            }
        });
    }
    else if(queryType=='great'){
        Fuel.find({}).where(str).gt(queryParam).sort({str:__bool}).exec(function(err,user){
            if(err)
                res.send(err);
            else
                res.send(user);
        });
    }
    else if(queryType=='equal'){
        Fuel.find({}).where(str).equals(queryParam).sort({str:__bool}).exec(function(err,user){
            if(err)
                res.send(err);
            else
                res.send(user);
        });
    }
    else {
        if(str=='_id'){
            Fuel.find({}).sort({'_id':__bool}).exec(function(err,user){
                if(err)
                    res.send(err);
                else
                    res.send(user);
            });
        }
        else if(str=='distance'){
            Fuel.find({}).sort({'distance':__bool}).exec(function(err,user){
                if(err)
                    res.send(err);
                else
                    res.send(user);
            });
        }
        else if(str=='fuel'){
            Fuel.find({}).sort({'fuel':__bool}).exec(function(err,user){
                if(err)
                    res.send(err);
                else
                    res.send(user);
            });
        }
        else if(str=='mileage'){
            Fuel.find({}).sort({'mileage':__bool}).exec(function(err,user){
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
  api.post('/fueldata', function(req, res){
      Counter.findOneAndUpdate({ "key":'key'},{ $inc:{count: 1 }},{ "new" : true}, function (err, counter) {
          if (err){
              console.log('some error occur')
          }
          else{
              var  fuel = new Fuel({
                   fuel:req.body.fuel,
                   distance:req.body.distance,
                   mileage:req.body.mileage,
                  _id:counter.count
              });
              fuel.save(function(err){
                  if(err){
                      res.send(err);
                  }
                  else res.json({message:'query sucesss'});
              });
          }
      });
  });

 api.get('/id', function(req,res){
        apiHelper(req,res,'_id');
     });
    api.get('/fuel', function(req,res){
        apiHelper(req,res,'fuel');
    });
    api.get('/distance', function(req,res){
        apiHelper(req,res,'distance');
    });
    api.get('/mileage', function(req,res){
        apiHelper(req,res,'mileage');
    });
    api.get('/clear', function(req,res){
       Counter.remove({}, function(){});
      var count = new Counter({key:'key',count:0});
        count.save(function(err){
            if(err)
               console.log('error in creating dumey schema');
        });
       Fuel.remove({}, function(err){
           if(err)
               res.json({message:'failed'});
           else
               res.json({message:'data remove succesfully'});
       });
    });
 return api;
};
