const express = require('express');  
const logger = require('morgan');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const mongoose = require('./config/database');
const jwt = require('jsonwebtoken');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.set("secretKey", "ClaveSecreta");
mongoose.connection.on('error', console.error.bind(console,"Error"));

app.use(logger('dev'));



app.get('/', function(req, res){
 res.json({"tutorial" : "Construyendo una API REST con NodeJS"});
});
app.use("/users", users);

app.listen(3000, function(){ console.log('El servidor ha sido inicializado: http://localhost:3000');});