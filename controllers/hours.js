// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// DB Models
const Hour = require('../models/hours');
const Opportunity = require('../models/opportunity');
const User = require("../models/user");

router.get('/', passport.authenticate('jwt', { session: false }),(req, res) => {
    Hour.find({})
    .then(hours => {
        console.log('All hours', hours);
        res.json({ hours: hours });
    })
    .catch(error => { 
        console.log('error', error)
        res.json({ message: 'Error occured, please try again' });
    });
});

router.get('/:id', passport.authenticate('jwt', { session: false }),(req, res) => {
    console.log('find hours by', req.params.id)
    Hour.findOne({
        id: req.params.id
    })
    .then(hours => {
        console.log('Here is your sign-in', hours.id);
        res.json({ hours: hours });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});

router.post('/:eventId', passport.authenticate('jwt', { session: false }),(req, res) => {
    Hour.create({
        signIn: req.body.signIn,
        signOut: req.body.signOut,
        eventId: mongoose.Types.ObjectId(req.params.eventId),
        userId: req.user._id,
    })
    .then(hours=> {
        Opportunity.findOneById(req.params.eventId)
        .then(opportunity=>{
            opportunity.hours.push(hours);
            opportunity.save();
        })
        .catch(error=>{
            console.log('error',error);
        })
        console.log('New sign in =>>', hours);
        res.json({ hours: hours });
    })
    .catch(error => { 
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" })
    });
});

router.post("/submitTime/:id", async (req, res) => {
    try {
      console.log(`Trying to get user: ${req.body.email}`);
      const found_user = await User.findOne(req.body.email);
      if (!found_user) { throw new Error(`No user found`); }
      console.log(found_user);
      console.log(`Found User with ID ${found_user._id}`);
      const data = await Hour.create({
        signIn: req.body.signIn,
        signOut: req.body.signOut,
        eventId: req.params.id,
        userId: found_user._id
 });
      console.log(data);
      res.json({ data });
  
    } catch (error) {
      console.log(error);
    }
  });


router.delete('/:id',passport.authenticate('jwt', { session: false }), (req, res) => {
    Hour.findOneAndRemove({ id: req.params.id})
    .then(response => {
        console.log('This was deleted', response);
        res.json({ message: `${req.params.id} was deleted`});
    })
    .catch(error => {
        console.log('error', error) 
        res.json({ message: "Error ocurred, please try again" });
    })
});

module.exports = router;