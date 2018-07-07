'use strict'

var express = require('express');
var bodyparser = require('body-parser');

var app = express();

//cargar rutas
var user_routes =  require('./routes/user');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//configurar cabeceras http

// rutas base
app.use('/api', user_routes);

// app.get('/login', function(req, res){
//     res.status(200).send({message: 'Bienvenidos al login'});
// })

module.exports = app;
