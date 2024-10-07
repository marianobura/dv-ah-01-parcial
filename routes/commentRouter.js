const express = require('express');
const router = express.Router();
/* ------------------------- Importo el Controlador ------------------------- */
const { createComment, getComments, getCommentsByUserId, updateCommentById, deleteCommentById } = require('../controllers/commentController');

router.get('/', getComments );
router.post('/', createComment );
router.get('/:id', getCommentsByUserId);
router.delete('/:id', deleteCommentById);
router.put('/:id', updateCommentById);

module.exports = router;