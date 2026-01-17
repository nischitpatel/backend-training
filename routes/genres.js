const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const Joi = require('joi');
const router = express.Router();

const genres = [
    { id: 1, name: 'Horror' },
    { id: 2, name: 'Comedy' }
];

// Schema of genre
const genresSchema = Joi.object({
    name: Joi.string().min(3).max(50).required()
});

// Get all genres
router.get('/', auth, (req, res) => {
    res.send(genres);
});

// Create a new genre
router.post('/', validate(genresSchema), (req, res) => {
    // Validation
    // if (!req.body.name || req.body.name.length < 3) {
    //     return res.status(400).send('Name is required and it should be atleast 3 characters long');
    // }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre);
    res.send(genre);
});

// Get a genre with ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const genre = genres.find((g) => g.id === id);

    if (!genre) res.send(`No genre with ID: ${id} found!`);

    res.send(genre);
});

// Update a genre
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const genre = genres.find((g) => g.id === id);

    if (!genre) return res.status(404).send('Genre not found');

    if (!req.body.name || req.body.name.length < 3) return res.status(400).send('Name is required an it should be atleast 3 characters long');

    genre.name = req.body.name;

    res.send(genre);
})

// Delete a genre
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const genre = genres.find((g) => g.id === id);

    if (!genre) return res.status(400).send('Genre not found');

    const index = genres.indexOf(genre);

    genres.splice(index, 1);

    res.send(genre);
})

module.exports = router;