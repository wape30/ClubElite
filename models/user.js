'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nombre: String,
    apellido: String,
    apodo: String,
    email: String,
    telefono: String,
    password: String,
    rol: String,
    img: String,
    descripcion: String,
    edad: String,
    ciudad: String,
    equipo: String
});

module.exports = mongoose.model('user', UserSchema);
