const jwt = require('jsonwebtoken');

const PASSWORD_JWT = process.env.SECRET_KEY_JWT_API;

const auth = (req, res, next) => {
    const jwtToken = req.header('Authorization');
    if(!jwtToken) return res.status(401).send('Acceso denegado');

    try {
        const payload = jwt.verify(jwtToken, PASSWORD_JWT);
        req.user = payload;
        next();
    } catch (error) {
        res.status(400).send('Acceso denegado');
    }
}


module.exports = auth;