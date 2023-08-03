const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/People');

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (isValidPassword) {
                const userObj = {
                    userId: user._id,
                    userName: user.username
                };

                const token = jwt.sign(userObj, process.env.JWT_SECRET, {
                    expiresIn: 60*60*1000
                });

                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: 60*60*1000,
                    httpOnly: false,
                    signed: true,
                });

                res.status(200).json('User successfully login');
            } else {
                throw createError('Login failed, please try again latter');
            }
        } else {
            throw createError('Login failed, please try again latter')
        }
    } catch(err) {
        res.status(400).json({
            errors: {
                common: {
                    msg: err.message
                }
            }
        })
    }
}

module.exports = {
    login,
}