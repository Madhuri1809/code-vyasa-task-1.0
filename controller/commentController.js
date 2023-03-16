const { ApiError } = require('../error');
const { StatusCodes } = require('http-status-codes');
const Comment = require('../Model/commenSchema');

const validUserIds = [
    '1',
    '2',
]

const validFeedIds = [
    '11',
    '22',
]

/**
 * Function for Creating a comment on a feed 
 * @param {*} req : Request 
 * @param {*} res : Response
 * @returns 
 */

const createComment = async (req, res) => {

    const { userId, feedId, text } = req.body;

    if (!userId) throw new ApiError(StatusCodes.OK, 'Please provide userId not found!', false, {});

    if (!(validUserIds.includes(userId.toString()))) throw new ApiError(StatusCodes.OK, 'User is not found in database!', false, {});

    if (!feedId) throw new ApiError(StatusCodes.OK, 'Please provide feedId not found!', false, {});

    if (!(validFeedIds.includes(feedId.toString()))) throw new ApiError(StatusCodes.OK, 'Feed is not found in database!', false, {});

    const comment = new Comment({
        userId,
        feedId,
        text,
    });

    const data = await comment.save();

    return res.json({
        success: true,
        httpCode: 200,
        message: 'Comment created successfully',
        data
    });

}


/**
 * Function of getting  all the comments of one user w.r.t. some feed
 * @param {*} req : Request 
 * @param {*} res : Response
 */

const getComments = async (req, res) => {

    const { userId, feedId } = req.params;

    if (!userId) throw new ApiError(StatusCodes.OK, 'Please provide userId not found!', false, {});;

    if (!(validUserIds.includes(userId.toString()))) throw new ApiError(StatusCodes.OK, 'User is not found in database!', false, {});

    if (!feedId) throw new ApiError(StatusCodes.OK, 'Please provide feedId not found!', false, {});

    if (!(validFeedIds.includes(feedId.toString()))) throw new ApiError(StatusCodes.OK, 'Feed is not found in database!', false, {});

    const comments = await Comment.find({ userId, feedId });

    return res.json({
        httpCode: 200,
        message: 'Comments fetched successfully',
        data: comments
    });

}

/**
 * Delete comment by comment Id
 * @param {*} req : Request 
 * @param {*} res : Response
 * @returns 
 */
const deleteComment = async (req, res) => {

    const { id: commentId } = req.params;

    const comment = await Comment.find({ id: commentId })

    if (!comment.length) throw new ApiError(StatusCodes.OK, 'Comment is not found in database!', false, {});

    const data = await Comment.findByIdAndDelete(commentId);

    return res.json({
        success: true,
        httpCode: 200,
        message: 'Comment is deleted successfully',
        data
    })
}

module.exports = {
    createComment,
    getComments,
    deleteComment
}