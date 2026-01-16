const jwt = require('jsonwebtoken');
// const config = require('config');

function auth(req, res, next) {
        // console.log(config.get('jwtPrivateKey'));

    const token = req.header('x-auth-token');

    // Check for token
    if(!token) return res.status(401).send('Access denied. No token provided.');
   
    try {
        // Verify token
        // const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        const decoded = jwt.verify(token, 'SECRET_KEY');

        // Attach to user to req
        req.user = decoded;

        next();
    } catch(err) {
        return res.status(400).send('Bad request. Invalid token.')
    }
}

module.exports = auth;