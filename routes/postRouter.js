const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostsByUserId, updatePostById, deletePostById } = require('../controllers/postController');

router.get('/', getPosts );
router.post('/', createPost );
router.get('/:id', getPostsByUserId);
router.delete('/:id', deletePostById);
router.put('/:id', updatePostById);

module.exports = router;