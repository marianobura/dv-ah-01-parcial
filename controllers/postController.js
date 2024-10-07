const Post = require('../models/postsModels');
const User = require('../models/usersModels');


const createPost = async (req, res) => {
    const { title, userId } = req.body;

    if (!title || !userId) {
        res.status(400).json({ msg: 'Faltan paramatros obligatorios', data: { title, userId } })
    }

    try {
        const user = await User.findById(userId)

        const newPost = new Post({ title, user: user._id })
        await newPost.save();
        res.status(200).json({ msg: 'Post creado', data: newPost })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'UPs tenemos un error :(', data: {} })
    }

}


const getPosts = async (req, res) => {
    const posts = await Post.find().populate('user')
    res.status(200).json({ msg: 'Ok', data: posts });
}


const getPostsByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (user) {
            res.status(200).json({ msg: "success", data: user });
        } else {
            res.status(404).json({ msg: "No se encontro el usuario ", data: {} });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'UPs tenemos un error :(', data: {} })
    }
}

const deletePostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndDelete(id);
        if (post) {
            res.status(200).json({ msg: "success", data: post });
        } else {
            res.status(404).json({ msg: "No se encontro el usuario ", data: {} });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'UPs tenemos un error :(', data: {} })
    }
}
const updatePostById = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
        const post = await Post.findByIdAndUpdate(id, { title }, { new: true });
        if (post) {
            res.status(200).json({ msg: "success", data: post });
        } else {
            res.status(404).json({ msg: "No se encontro el post ", data: {} });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'UPs tenemos un error :(', data: {} })
    }
}

module.exports = { createPost, getPosts, getPostsByUserId, deletePostById, updatePostById };