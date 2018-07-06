'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(req,res){
  res.status(200).send({
    message: 'Probando una accion del controlador de user del api rest con Node y Mongodb'
  });
}


function saveUser(req,res){
  var user = new User();

  var params = req.body;

  console.log(params);

  user.nombre = params.nombre;
  user.apellido = params.apellido;
  user.apodo = params.apodo;
  user.email = params.email;
  user.telefono = params.telefono;
  user.password = params.password;
  user.rol = 'ROLE_USER';
  user.img = 'null';
  user.descripcion = params.descripcion;
  user.edad = params.edad;
  user.ciudad = params.ciudad;
  user.equipo = params.equipo;

  if(params.password){
    // Encriptar contraseña y guardar datos
    bcrypt.hash(params.password, null, null, function(err, hash){
      user.password = hash;
      if(user.nombre!=null && user.apellido && user.email != null){
        // Guardar Usuario
        user.save((err, userStored) => {
          if(err){
            res.status(500).send({message: 'Error al guardar el usuario'});
          }else{
            if(!userStored){
              res.status(404).send({message: 'No se ha registrado el usuario'});
            }else{
              res.status(200).send({user: userStored});
            }
          }
        })
      }else{
        res.status(200).send({message: 'Rellena todos los campos'});
      }
    })
  }else{
    res.status(500).send({message: 'Introduce la contraseña'});
  }
}


function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if (err) {
            res.status(500).send({message: 'Error en la petición '});
        }else {
          if (!user) {
              res.status(404).send({message: 'El usuario no existe '});
          }else {
            //vamos a comprobar la contrasena
            bcrypt.compare(password, user.password, function(err, check){
              if (check) {
                //devolver los datos del usuario logeado
                if (params.gethash) {
                  // devuelve un token de jwt
                  res.status(200).send({
                    token: jwt.createToken(user)
                  });

                }else {
                    res.status(200).send({user});
                }

              }else {
                // dira que la contras;a es incorrecta o no se puede logear
                  res.status(404).send({message: 'El usuario no ha podido logearse '});
              }

            });
          }
        }

    });

}

function updateUser(req, res){
  var userId = req.params.id;
  var update = req.body;

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if(err){
      res.status(500).send({message: 'Error al actualizar el usuario'});
    }else{
      if(!userUpdated){
       res.status(404).send({message: 'No se ha podido actualizar el usuario'});
     }else{
       res.status(200).send({user: userUpdated});
     }
    }
  });
}



/*para poder usar fuera del fichero los metodos*/
module.exports = {
  pruebas,
  saveUser,
  loginUser,
  updateUser
};
