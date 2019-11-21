const ModeloUsuario = require('../Models/Usuarios');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PASSWORD_JWT = process.env.SECRET_KEY_JWT_API;

const UsuarioController = {
    encript: async (req, res) => {
        const { password } = req.body;
        const salt = await bcryptjs.genSalt(11);
        const hashPassword = await bcryptjs.hash(password, salt);
        
        return res.status(200).send(hashPassword);
    },
    signin: async (req, res) => {
        const { usuario, password } = req.body;

        const user = await ModeloUsuario.findOne({ usuario });
        if (!user) return res.status(400).send('Credenciales no válidas.');

        const validandoPassword = await bcryptjs.compare(password, user.password);
        if (!validandoPassword) return res.status(400).send('Credenciales no válidas.');
        
        const userResponse = {
            usuario: user.usuario,
            perfil: user.perfil,
            nombre: user.nombre,
            correo: user.correo,
        };
        
        const jwtToken = await jwt.sign({ ...userResponse }, PASSWORD_JWT, { expiresIn: '1m' });
        return res.header('Authorization', jwtToken).send({ ...userResponse });
    },
    listar: async (req, res) => {
       const usuarios = await ModeloUsuario.find();
       return res.send(usuarios);
    }
};

module.exports = UsuarioController;