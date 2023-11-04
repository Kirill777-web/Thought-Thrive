const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//GET all posts for homepage
// This is the route that is being used to get all the posts from the database
router.get('/', async (req, res) => {
  try {
    // Get all Posts and JOIN with user data (find all posts and include the user data)
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment, // Include comments
          include: [
            {
              model: User,
              attributes: ['username'], // Include username of the commenter
            },
          ],
        },
      ],
    });
    // Serialize data so the template can read it plain true means that the data is in a plain object
    //So basically we are serializing the data from the database so that we can use it in the template
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all posts for homepage and mydashboard since they are doing the same
router.get(['/', '/mydashboard'], withAuth, async (req, res) => {
  try {
    const userData =
      req.path === '/mydashboard'
        ? await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
          })
        : null;

    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    const user = userData ? userData.get({ plain: true }) : null;

    res.render(req.path.substring(1), {
      // this will render 'homepage' or 'mydashboard' based on the path
      ...(user && { user }), // only include user if it's defined
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET single post by ID (merged duplicate route)
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route to fetch comments for a specific post (removed duplicate API route)
router.get('/api/posts/:id/comments', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const commentsData = await Comment.findAll({
      where: { postId: postId },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    res.json(commentsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Profile page - Consolidated with withAuth middleware
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Handle login route - No change required
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/mydashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
