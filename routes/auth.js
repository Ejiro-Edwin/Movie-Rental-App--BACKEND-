const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config =require('config');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid Email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Email or password');

    // const token = jwt.sign({ _id : user._id},config.get('JwtPrivateKey'));
    const token = user.generateUserAuthToken();
 
    res.send(token);
});


function validate(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);

}

module.exports = router;