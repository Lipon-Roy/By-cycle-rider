const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    let token = req.headers.token ? req.headers.token : null;

    if (token) {
        try {
            const token = token.split(' ')[1];
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