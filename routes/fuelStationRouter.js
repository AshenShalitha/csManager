const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const FuelStations = require('../models/fuelStation');

const fuelStationRouter = express.Router();
fuelStationRouter.use(bodyParser.json());

//all records-------------------------------------------------------------------------------------------------
fuelStationRouter.route('/')
.get((req,res,next)=>{
    FuelStations.find({})
    .populate('customers.customerId')
    .then((fuelStations)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fuelStations);
    },(err)=>next(err)) 
    .catch((err)=>next(err));
})
.post(authenticate.verifyUser, (req,res,next)=>{
    FuelStations.create(req.body)
    .then((fuelStation)=>{
        console.log('Customer added', fuelStation);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fuelStation);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /fuelStations');
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    FuelStations.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeade
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

//custom-----------------------------------------------------------------------------------------------------

fuelStationRouter.route('/getFSNamesAndCity')
.get(authenticate.verifyUser,(req,res,next)=>{
    FuelStations.find({} , {name:1, "address.city":1}).sort({"address.city":1})
    .then((fuelStations)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fuelStations);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

fuelStationRouter.route('/addFillingStation')
    .put((req,res,next)=>{
        FuelStations.findByIdAndUpdate(req.body.fuelStationId, {
            $addToSet: req.body
        },{ new: true })
        .then((resp)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success:true});
        }, (err) => next(err))
        .catch((err) => next(err));
    })


//fuelStation by id -----------------------------------------------------------------------------------------
fuelStationRouter.route('/:fuelStationId')
.get(authenticate.verifyUser,(req,res,next) => {
    FuelStations.findById(req.params.fuelStationId)
    .populate('customers.customerId')
    .then((fuelStation) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fuelStation);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /fuelStations/'+ req.params.fuelStationId);
})
.put(authenticate.verifyUser,(req, res, next) => {
    FuelStations.findByIdAndUpdate(req.params.fuelStationId, {
        $set: req.body
    }, { new: true })
    .then((fuelStation) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fuelStation);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req, res, next) => {
    FuelStations.findByIdAndRemove(req.params.fuelStationId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = fuelStationRouter;
