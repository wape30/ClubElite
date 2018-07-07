'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/midatabase', (err, res) => {
  if(err){
    console.log(err);
    throw err;
  }else{
  console.log("La base de datos esta corriendo correctamente ....");

  app.listen(port, function(){
      console.log("Servidor App Red Social escuchando en "+port);
  });
  }
});
