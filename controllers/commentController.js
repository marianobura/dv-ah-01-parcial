const Comment = require("../models/commentsModels");
const User = require("../models/usersModels");

const createComment = async (req, res) => {
    const { description, userId } = req.body;

    if (!description || !userId) {
        res
            .status(400)
            .json({
                msg: "Faltan paramatros obligatorios",
                data: { description, userId },
            });
    }

    try {
        const user = await User.findById(userId);

        const newComment = new Comment({ description, user: user._id });
        await newComment.save();
        res.status(200).json({ msg: "Comentario creado", data: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error en el servidor", data: {} });
    }
};

const getComments = async (req, res) => {
    const comments = await Comment.find().populate("user");
    res.status(200).json({ msg: "Ok", data: comments });
};

const getCommentsByUserId = async (req, res) => {
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
        res.status(500).json({ msg: "Hubo un error en el servidor", data: {} });
    }
};

const deleteCommentById = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findByIdAndDelete(id);
        if (comment) {
            res.status(200).json({ msg: "success", data: comment });
        } else {
            res.status(404).json({ msg: "No se encontró el usuario ", data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error en el servidor", data: {} });
    }
};
const updateCommentById = async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    try {
        const comment = await Comment.findByIdAndUpdate(
            id,
            { description },
            { new: true }
        );
        if (comment) {
            res.status(200).json({ msg: "success", data: comment });
        } else {
            res.status(404).json({ msg: "No se encontro el comentario ", data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error en el servidor", data: {} });
    }
};

module.exports = {
    createComment,
    getComments,
    getCommentsByUserId,
    deleteCommentById,
    updateCommentById,
};
