const auth = require('../middleware/auth');
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);

});

router.get('/:id', async (req, res) => {
    const movies = await Movie.findById(req.params.id)
    if (!movies) return res.status(404).send('The Genre with the given ID was not found');
    res.send(movies);
});

router.post('/',auth, async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Invalid Genre');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
  await movie.save();
    res.send(movie);
});

router.put('/:id',auth, async (req, res) => {
    const result = validate(req.body); //validate
    if (result.error) return res.status(400).send(result.error.details[0].message);


    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Invalid Genre');

    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, { new: true });

    if (!movie) return res.status(404).send('The Movie with the given ID was not found');

    res.send(movie);
});


router.delete('/:id',auth, async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('The Movie with the given ID was not found');

    res.send(movie);
});

module.exports = router;