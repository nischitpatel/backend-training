require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    {
        id: 1,
        name: 'Horror'
    },
    {
        id: 2,
        name: 'Comedy'
    }
];

app.get('/', (req, res) => {
    res.send('Hello world');
})

// Get all genres
app.get('/api/genre', (req, res) => {
    res.send(genres);
});

// Get a genre with ID
app.get('/api/genre/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const genre = genres.find((g)=>g.id === id);

    if(!genre) res.send(`No genre with ID: ${id} found!`);

    res.send(genre);
});

// Create a new genre
app.post('/api/genre', (req, res) => {
    // Validation
    if(!req.body.name || req.body.name.length < 3) {
        return res.status(400).send('Name is required and it should be atleast 3 characters long');
    }

    const genre = {
        id: genres.length+1,
        name: req.body.name
    }

    genres.push(genre);
    res.send(genre);
});

// Delete a genre
app.delete('/api/genre/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const genre = genres.find((g) => g.id === id);

    if(!genre) return res.status(400).send('Genre not found');

    const index = genres.indexOf(genre);

    genres.splice(index, 1);

    res.send(genre);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serve is listening at http://localhost:${PORT}...`);
})