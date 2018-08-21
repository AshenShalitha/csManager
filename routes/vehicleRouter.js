const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Vehicles = require('../models/vehicles');

const vehicleRouter = express.Router();
vehicleRouter.use(bodyParser.json());

//all vehicles
vehicleRouter.route('/')
.get(authenticate.verifyUser,(req,res,next)=>{
    Vehicles.find({})
    .populate('ownersId')
    .then((vehicles)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(vehicles);
        console.log(req.query);
    }, (err)=>next(err))
    .catch((err)=>next(err));
})
.post(authenticate.verifyUser,(req,res,next)=>{
    req.body.ownersId = req.user._id;
    Vehicles.create(req.body)
    .then((vehicle)=>{
        console.log('Vehicle Created', vehicle);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(vehicle);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /vehicles');
})
.delete(authenticate.verifyUser,(req,res,next)=>{
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
.get(authenticate.verifyUser,(req,res,next) => {
    Vehicles.findById(req.params.vehicleId)
    .populate('ownersId')
    .then((vehicle) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(vehicle);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /vehicles/'+ req.params.dishId);
})
.put(authenticate.verifyUser,(req, res, next) => {
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
.delete(authenticate.verifyUser,(req, res, next) => {
    Vehicles.findByIdAndRemove(req.params.vehicleId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = vehicleRouter;