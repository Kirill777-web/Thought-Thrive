const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.commentContent,
      post_id: req.body.postId,
      user_id: req.session.user_id, // Ensure this is set up in your session when a user logs in
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Create a new comment associated with a post
router.post('/posts/:id/comments', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.params.id,
    });

    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

//Delete a comment
router.delete('/api/comments/:commentId', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.comment_id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
