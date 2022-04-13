// server setting
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");

// import router
const indexRouter = require('./routes/index');


// middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);


// Run Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});

