function admin(req, res, next) {
    // Authorization required authentication
    if(!req.user) return res.status(401).send('Access Denied.');

    // Verify user's role
    if(!req.user.isAdmin) return res.status(403).send('Access Forbidden');

    next();
}

module.exports = admin;