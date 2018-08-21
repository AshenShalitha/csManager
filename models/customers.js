const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
var pasportLocalMongoose = require('passport-local-mongoose');


var customerSchema = new Schema({
    name: {
        type: String,
        unique: false
    },
    type: {
        type: String,
    },
    contactPersonName: {
        type: String,
    },
    phone: {
        type: String,
    },
    allocatedLimit: {
        type: Currency,
        min: 0
    },
    currentLimit: {
        type: Currency,
        min: 0
    },
    fuelStationIds: [{
        status: String,
        fsid : {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'FuelStation'
        },
        _id : false
    }],
    address: {
        city: String,
        street: String,
        number: String
    },
    admin:   {
        type: Boolean,
        default: false
    }
}, {
        timestamps: true
    });

customerSchema.plugin(pasportLocalMongoose);

var Customers = mongoose.model('Customer', customerSchema);

module.exports = Customers;