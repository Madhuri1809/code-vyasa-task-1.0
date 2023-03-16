const express = require('express');
const router = express.Router()
const comment = require('../controller/commentController')

/**
 * Read all the comments of one user w.r.t. some feed
 */
router.post('/', comment.createComment);


/**
 * Fetch comment by Id
 */
router.get('/:userId/:feedId', comment.getComments);

/**
 * Delete any comment posted by the user
 */
router.delete('/:id', comment.deleteComment);

module.exports = router;