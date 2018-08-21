const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PurchaseOrder = require('../models/purchaseOrders');

const purchaseOrderRouter = express.Router();

//all purchase orders-------------------------------------------------
purchaseOrderRouter.route('/')
.get((req,res,next)=>{
    PurchaseOrder.find({})
    .populate('vehicleId')
    .populate('fuelStationId')
    .populate('customerId')
    .then((purchaseOrder)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(purchaseOrder);
    }, (err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    PurchaseOrder.create(req.body)
    .then((purchaseOrder)=>{
        console.log('PurchaseOrder Created', purchaseOrder);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(purchaseOrder);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /purchaseOrder');
})
.delete((req,res,next)=>{
    PurchaseOrder.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});


//purchase order by id------------------------------------------------
purchaseOrderRouter.route('/:purchaseOrderId')
.get((req,res,next) => {
    PurchaseOrder.findById(req.params.purchaseOrderId)
    .populate('vehicleId')
    .populate('fuelStationId')
    .populate('customerId')
    .then((purchaseOrder) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(purchaseOrder);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /purchaseOrders/'+ req.params.dishId);
})
.put((req, res, next) => {
    PurchaseOrder.findByIdAndUpdate(req.params.purchaseOrderId, {
        $set: req.body
    }, { new: true })
    .then((purchaseOrder) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(purchaseOrder);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    PurchaseOrder.findByIdAndRemove(req.params.purchaseOrderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = purchaseOrderRouter;