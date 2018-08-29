const auth = require('../middleware/auth');
const { Customer, validate } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer);

});

router.get('/me', async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('The Customer with the given ID was not found');
    res.send(customer);
});

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const result = validate(req.body); //validate
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold

    }, { new: true })
    if (!customer) return res.status(404).send('The Customer with the given ID was not found');

    res.send(customer);
});

router.delete('/:id',auth, async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    // const genre = genres.find(c => c.id === parseInt(req.params.id));   //check if it exist
    if (!customer) return res.status(404).send('The Customer with the given ID was not found');

    res.send(customer);
});


module.exports = router;
