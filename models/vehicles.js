const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


vehicleSchema = new Schema({
    vehicleName : {
        type : String,
        required : true
    },
    vehicleNumber : {
        type : String,
        required : true,
        unique : true
    },
    ownersId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    addedBy : {
        type : String,
        required : true
    },
    allocatedLimit : {
        type : Currency,
        min : 0
    }
},{
    timestamps : true
});

var Vehicles = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicles;