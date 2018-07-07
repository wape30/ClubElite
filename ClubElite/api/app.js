'use strict'

var express = require('express');
var bodyparser = require('body-parser');

var app = express();

//cargar rutas
var user_routes =  require('./routes/user');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//configurar cabeceras http
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Acces-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});
// rutas base
app.use('/api', user_routes);

// app.get('/login', function(req, res){
//     res.status(200).send({message: 'Bienvenidos al login'});
// })

module.exports = app;
