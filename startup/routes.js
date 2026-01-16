const express = require('express');
const genres = require('../routes/genres');
const logger = require('../middleware/logger');

module.exports = function(app) {
    app.use(express.json());
    app.use(logger);
    app.use('/api/genre', genres);
}

