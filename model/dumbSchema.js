/**
 * Created by SAGAR on 7/13/2016.
 */
/**
 * Created by SAGAR on 7/12/2016.
 */
var mongoose = require('mongoose');
counterSc = new  mongoose.Schema({
    key:{type:String},
    count:{type:Number}
});
var counterSchemModel = mongoose.model('Counter',counterSc);
var start = new counterSchemModel({
    key:'key',
    count:0
});
start.save();
module.exports = counterSchemModel;