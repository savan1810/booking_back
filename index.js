const connectToMongo=require("./db");
const express=require('express');
const app=express();
var cors = require('cors')
const cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
// app.use(express.static('uploads'))
const PORT=process.env.PORT || 4000

app.use(cors())
connectToMongo();
app.use(express.json())
app.use('/api/auth',require('./routes/user'))
app.use('/api/place',require('./routes/places'))
app.use('/api/booking',require('./routes/booking'))

app.listen(PORT);
