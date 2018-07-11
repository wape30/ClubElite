'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmpresaSchema =  Schema({
  id_user: { type: Schema.ObjectId, ref: 'user'},
  nombre: String,
  descripcion: String,
  image: String
/*
Fecha de creación
Dirección
Teléfono
    */

});

module.exports = mongoose.model('empresa', EmpresaSchema);
