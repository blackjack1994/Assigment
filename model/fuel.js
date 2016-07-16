/**
 * Created by SAGAR on 7/12/2016.
 */
var mongoose = require('mongoose');
var fuel = mongoose.Schema;
fuel = new fuel({
    _id:Number,
    fuel:{type:Number,require:true},
    distance:{type:Number,require:true},
    mileage:{type:Number , require:true},
});
module.exports =  mongoose.model('Fuel',fuel);