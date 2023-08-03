const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    let cookies = Object.keys(req.signedCookies).length > 0 ? res.signedCookies : null;

    if (cookies) {
        try {
            const token = cookies[process.env.COOKIE_NAME];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch(err) {
            res.status(500).json({
                error: 'Authentication failure'
            });
        }
    } else {
        res.status(401).json({
            error: 'Authentication failure'
        });
    }
}

module.exports = checkLogin;