/* ---------------------------- Importamos el modelo --------------------------- */
const User = require('../models/usersModels');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRETKEY;
const salt = 10;

const createUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ msg: 'Faltan paramátros obligatorios', data: { username, password } })
    }

    const passwordHash = await bcrypt.hash(password, salt);

    try {
        // Creo una instancia del modelo
        const newUser = new User({ username, password: passwordHash })
        await newUser.save();
        res.status(200).json({ msg: 'Usuario creado', data: newUser })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor', data: {} })
    }

}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        // Verificamos si el username existe
        if (!user) {
            res.status(401).json({ msg: 'El username no existe', data: {} });
        }
        // Verificamos si el password es valido
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
            res.status(401).json({ msg: 'La contraseña es incorrecta', data: {} });
        }
        // Si todo va bien, generamos el token
        const data = {
            userId: user._id,
            username: user.username
        }
        const token = jwt.sign(data, secretKey, { expiresIn: '1h' });

        console.log(token);
        // Enviamos le token al cliente
        res.status(200).json({ msg: 'success', data: { jwt: token } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor', data: {} })
    }
}


const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json({ msg: 'Ok', data: users });
}


const getUsersById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (user) {
            res.status(200).json({ msg: "success", data: user });
        } else {
            res.status(404).json({ msg: "No se encontró el usuario ", data: {} });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor', data: {} })
    }
}

const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (user) {
            res.status(200).json({ msg: "success", data: user });
        } else {
            res.status(404).json({ msg: "No se encontró el usuario ", data: {} });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor', data: {} })
    }
}
const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { username, password }, { new: true });
        if (user) {
            res.status(200).json({ msg: "success", data: user });
        } else {
            res.status(404).json({ msg: "No se encontró el usuario ", data: {} });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor', data: {} })
    }
}


module.exports = { createUser, getUsers, getUsersById, deleteUserById, updateUserById, login };