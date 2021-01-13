const express = require('express');
const users = require('./routes/users');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const app = express();

if(!config.get('jwtPrivateKey')){
    console.log("FATAL ERROR: JwtPrivateKey not defined");
    process.exit(1);
}

mongoose.connect('mongodb"//localhost/forum')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('could not connect to mongoDB'));


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/users', users);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});