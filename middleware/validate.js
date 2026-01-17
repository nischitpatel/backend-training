function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if(error) {
            const message = error.details.map(d => d.message).join(', ');
            return res.status(400).send(message);
        }

        next();
    };
}

module.exports = validate;