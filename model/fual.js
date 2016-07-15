/**
 * Created by SAGAR on 7/12/2016.
 */
var mongoose = require('mongoose');
var fual = mongoose.Schema;
fual = new fual({
    _id:Number,
    fual:{type:Number,require:true,},
    distance:{type:Number,require:true},
    milage:{type:Number , require:true},
});
module.exports =  mongoose.model('Fual',fual);