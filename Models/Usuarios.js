const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    perfil: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    usuario: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    estatus: { type: Boolean, required: true }
});

module.exports = mongoose.model('Usuarios', usuarioSchema);