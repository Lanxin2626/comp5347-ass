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
const userRouter = require('./routes/auth');
const phoneRouter = require('./routes/phonelist');
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
app.use(cookieParser());


// user routes
app.use('/', indexRouter);
app.use('/api/user', userRouter);

//phone routes
app.use('/api/phone', phoneRouter);


// Run Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});

