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
    edad: String,//fecha nacimiento
    ciudad: String,
    equipo: String
    /*
    cedula
    direccion residencia
    pais
    genero - masculino femenino otro
    restircciones alimenticias - ninguna, dieta vegetariana, dieta vegana, dieta sin gluten, dieta kosher, otro
    cuidados especiales - ninguno, consumo de medicamentos, alergias, movilidad restringida
    Salto Cuántico
    Angel
    Estatus - graduado, elite superior etc etc etc
    Profesión
    */

});

module.exports = mongoose.model('user', UserSchema);
