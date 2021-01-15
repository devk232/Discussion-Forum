const express = require('express');
const users = require('./routes/users');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const cookieParser = require('cookie-parser')
const app = express();

if(!config.get('jwtPrivateKey')){
    console.log("FATAL ERROR: JwtPrivateKey not defined");
    process.exit(1);
}
let mongoDB = "mongodb://127.0.0.1/forum";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('could not connect to mongoDB'));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/users', users);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});