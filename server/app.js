// server setting
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");

// import router
const userRouter = require('./routes/auth');
const phoneRouter = require('./routes/phonelist');
const userActionRouter = require('./routes/user_operation');
const cartRouter = require('./routes/checkout')

// Database Connection
mongoose.connect('mongodb://localhost/COMP5347PROJECT', { useNewUrlParser: true }, function(err){
	console.log('mongodb connected')
	if(err){
		console.log("error in connecting "+err)
	}
	else{
		console.log("connecting successfully to COMP5347PROJECT")
	}
});

// middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// user routes
app.use('/api/user', userRouter);
app.use('/api/userop', userActionRouter);
app.use('/api/cart', cartRouter)

//phone routes
app.use('/api/phone', phoneRouter);

//404 page
app.use( function (req, res, next){
	res.status(404).json({
		code: 404,
		message:"404 - Not Found"
	})
});

// Run Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});

