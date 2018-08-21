const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;



var fuelStationSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    customers: [{
        status: String,
        customerId : {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        }
    }],
    address: {
        city: String,
        street: String,
        number: String
    }
}, {
    timestamps : true
});


var FuelStations = mongoose.model('FuelStation', fuelStationSchema);

module.exports = FuelStations;