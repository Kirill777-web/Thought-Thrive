const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts regardless of user
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      res
        .status(400)
        .json({ message: 'Please provide title and content for the post!' });
      return;
    }
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Fetch a single post by ID from Database
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = await Post.findByPk(postId);

    if (!postData) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    if (postData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'Unauthorized to update this post' });
      return;
    }

    const updatedPost = await postData.update(req.body);
    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = await Post.findByPk(postId);

    if (!postData) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Check if the logged-in user is the owner of the post
    if (postData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'Unauthorized to delete this post' });
      return;
    }

    // Delete the post if the user is the owner
    await postData.destroy();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
