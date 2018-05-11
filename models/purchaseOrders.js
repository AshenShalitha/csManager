const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

purchaseOrderSchema = new Schema({
    vehicleId : {
        type : String,
        required : true
    },
    fuelType : {
        type : String,
        required : true
    },
    litres : {
        type : Number,
        required : true,
        min : 0
    },
    price : {
        type : Currency,
        required : true,
        min : 0
    },
    enteredBy : {
        type : String
    },
    status : {
        type : String
    },
    fuelStationId : {
        type : String
    },
    customerId : {
        type : String
    }
}, {
    timestamps : true
}); 

var PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrder;