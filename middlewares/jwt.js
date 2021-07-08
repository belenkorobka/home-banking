const jwt = require('jsonwebtoken');

function jwtMiddleware(req, res, next) {
    const headerAuth = req.headers['authorization'];
    if (!headerAuth) {
        return res.status('401').json({ message: 'Token is missing!' });
    }
    const [, token] = headerAuth.split(' ');
    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenDecoded.user;
    } catch (error) {
        let message;
        switch (error.name) {
            case 'JsonWebTokenError':
                message = 'Error in the JWT';
                break;
            default:
                message = 'Error';
                break;
        }
        return res.status(401).json({ message });
    }
    return next();
}

module.exports = jwtMiddleware;