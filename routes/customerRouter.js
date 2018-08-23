const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('../authenticate');

const Customers = require('../models/customers');

const customerRouter = express.Router();
customerRouter.use(bodyParser.json());

//all customers--------------------------------------------------
customerRouter.route('/')
    .get((req, res, next) => {
        Customers.find({})
        .populate('fuelStationIds.fsid')
            .then((customers) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(customers);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Customers.create(req.body)
            .then((customer) => {
                console.log('Customer added', customer);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(customer);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /customers');
    })
    .delete((req, res, next) => {
        Customers.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeade
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


//other routes
customerRouter.route('/getUserByUsername')
    .post((req, res, next) => {
        Customers.find({ username: req.body.username }, { name: 1 })
            .then((customer) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(customer);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

customerRouter.route('/addFillingStation/:customerId')
    .post((req,res,next)=>{
        console.log(req.body)
         var fuelStation = {status:req.body.status,fsid: req.body.fsid}
         Customers.findByIdAndUpdate(req.params.customerId, {
              $addToSet: {fuelStationIds: fuelStation}
        },{ new: true })
        .then((resp)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success:true});
        }, (err) => next(err))
        .catch((err) => next(err));
    })

customerRouter.route('/viewSelectedFuelStations')
    .post((req,res,next)=>{
        var _id = req.body._id
        Customers.findById(_id, { _id:0, fuelStationIds:1})
        .populate('fuelStationIds.fsid')
            .then((customer) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(customer);
            }, (err) => next(err))
            .catch((err) => next(err));
    })



//authenticate--------------------------------------------------------
customerRouter.post('/signup', (req, res, next) => {
    Customers.register(new Customers({ username: req.body.username }),
        req.body.password, (err, customer) => {
            if (err) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: false, status: 'Username is alredy taken!' });
            }
            else {
                if (req.body.name)
                    customer.name = req.body.name;
                if (req.body.type)
                    customer.type = req.body.type;
                if (req.body.contactPersonName)
                    customer.contactPersonName = req.body.contactPersonName;
                if (req.body.phone)
                    customer.phone = req.body.phone;
                if (req.body.address)
                    customer.address = req.body.address;
                customer.save((err, customer) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ err: err });
                        return;
                    }
                    passport.authenticate('local')(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: true, status: 'Registration Successful!' });

                    })
                });
            }
        });
});

customerRouter.post('/login', passport.authenticate('local'), (req, res) => {
    var token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!' });
});

customerRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


//customer by id -----------------------------------------------
customerRouter.route('/:customerId')
    .get((req, res, next) => {
        Customers.findById(req.params.customerId)
        .populate('fuelStationIds.fsid')
            .then((customer) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(customer);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /customers/' + req.params.customerId);
    })
    .put((req, res, next) => {
        Customers.findByIdAndUpdate(req.params.customerId, {
            $set: req.body
        }, { new: true })
            .then((customer) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(customer);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Customers.findByIdAndRemove(req.params.customerId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });




module.exports = customerRouter;