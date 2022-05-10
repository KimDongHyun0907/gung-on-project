const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.redirect('/login');
   }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET_STRING);
        req.user = decoded;
    } catch {
        return res.sendStatus(403);
    }
    return next();
};

module.exports = verifyToken;