const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Vehicles = require('../models/vehicles');

const vehicleRouter = express.Router();


//all vehicles
vehicleRouter.route('/')
.get((req,res,next)=>{
    Vehicles.find({})
    .then((vehicles)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(vehicles);
    }, (err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    Vehicles.create(req.body)
    .then((vehicle)=>{
        console.log('Vehicle Created', vehicle);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(vehicle);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /vehicles');
})
.delete((req,res,next)=>{
    Vehicles.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

//vehicle by id---------------------------------------------------------------------------------------------
vehicleRouter.route('/:vehicleId')
.get((req,res,next) => {
    Vehicles.findById(req.params.vehicleId)
    .then((vehicle) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(vehicle);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /vehicles/'+ req.params.dishId);
})
.put((req, res, next) => {
    Vehicles.findByIdAndUpdate(req.params.vehicleId, {
        $set: req.body
    }, { new: true })
    .then((vehicle) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(vehicle);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Vehicles.findByIdAndRemove(req.params.vehicleId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = vehicleRouter;