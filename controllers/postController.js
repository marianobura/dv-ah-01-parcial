const Post = require('../models/postsModels');
const User = require('../models/usersModels');

const createPost = async (req, res) => {
    const { title, body, tags, reactions, views, userId } = req.body;

    if (!title || !body || !userId) {
        return res.status(400).json({ msg: 'Faltan paramatros obligatorios', data: { title, body, userId } })
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        const newPost = new Post({ title, body, tags, reactions, views, user: user._id });
        await newPost.save();
        res.status(200).json({ msg: 'Post creado', data: newPost })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor', data: {} })
    }
}

const getPosts = async (req, res) => {
    const posts = await Post.find().populate('user')
    res.status(200).json({ msg: 'Ok', data: posts });
}

const getPostsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const posts = await Post.find({ user: userId }).populate('user');
        if (posts.length > 0) {
            res.status(200).json({ msg: "success", data: posts });
        } else {
            res.status(404).json({ msg: "No se encontró el ningún post para ese usuario ", data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor', data: {} })
    }
}

const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate('user');
        if (post) {
            res.status(200).json({ msg: "success", data: post });
        } else {
            res.status(404).json({ msg: "No se encontró el post ", data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor', data: {} })
    }
}

const deletePostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndDelete(id);
        if (post) {
            res.status(200).json({ msg: "success", data: post });
        } else {
            res.status(404).json({ msg: "No se encontró el post ", data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor', data: {} })
    }
}
const updatePostById = async (req, res) => {
    const { id } = req.params;
    const { title, body, tags, reactions, views } = req.body;

    try {
        const post = await Post.findByIdAndUpdate(id, { title, body, tags, reactions, views }, { new: true });
        if (post) {
            res.status(200).json({ msg: "success", data: post });
        } else {
            res.status(404).json({ msg: "No se encontró el post ", data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor', data: {} })
    }
}

module.exports = { createPost, getPosts, getPostsByUserId, getPostById, deletePostById, updatePostById };