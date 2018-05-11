const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


var customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique : true
    },
    type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactPersonName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    allocatedLimit: {
        type: Currency,
        min: 0
    },
    currentLimit: {
        type: Currency,
        min: 0
    },
    fuelStationIds: {
        type: String,
    },
    status: {
        type: String,

    }
}, {
        timestamps: true
    });

var Customers = mongoose.model('Customer', customerSchema);

module.exports = Customers;