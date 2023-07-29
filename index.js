// external imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// internal imports
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const cycleRouter = require('./routers/cycleRouter');

const app = express();
dotenv.config();

// database connection
mongoose.connect(process.env.DB_URL_STRING)
    .then(() => console.log('Database connection successfull'))
    .catch(err => console.log(err));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing setup
app.get("/", (req, res) => {
    res.send("Hello Cycle Rider");
});
app.use('/cycle', cycleRouter);

// 404 not found handler
app.use(notFoundHandler)

// common error handler
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
});