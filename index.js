// external imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// internal imports
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const cycleRouter = require('./routers/cycleRouter');
const userRouter = require('./routers/userRouter');
const loginRouter = require('./routers/loginRouter');

const app = express();
app.use(cors());
dotenv.config();

// database connection
mongoose.connect(process.env.DB_URL_STRING)
    .then(() => console.log('Database connection successfull'))
    .catch(err => console.log(err));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.get("/", (req, res) => {
    res.status(200).json({
        message: 'Hello By cycle rider'
    });
});

app.use('/cycle', cycleRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);

// 404 not found handler
app.use(notFoundHandler)

// common error handler
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
});