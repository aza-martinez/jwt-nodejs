'use strict'

const express = require('express');
const router = express.Router();

const UsuarioController = require('../Controllers/UsuarioController');
const AuthMiddleWare = require('../Middleware/auth');

// RUTAS USUARIOS
router.post('/password/encript', UsuarioController.encript);
router.get('/usuarios/listar', AuthMiddleWare, UsuarioController.listar);

// RUTAS AUTH
router.get('/signin', UsuarioController.signin);

module.exports = router;