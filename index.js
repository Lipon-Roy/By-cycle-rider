// external imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// internal imports
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const cycleRouter = require('./routers/cycleRouter');

const app = express();
dotenv.config();

// database connection

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing setup
app.use('/cycle', cycleRouter);

// 404 not found handler
app.use(notFoundHandler)

// common error handler
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
});