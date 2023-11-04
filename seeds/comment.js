const { Comment } = require('../models');

const commentData = [
  {
    content:
      'Really insightful article on MVC. Helped me understand the concept much better.',
    user_id: 2,
    post_id: 1,
    last_modified: new Date(), // Adding the last_modified field here
  },
  {
    content:
      'Node.js and Express are truly powerful for back-end development. Thanks for sharing!',
    user_id: 1,
    post_id: 2,
    last_modified: new Date(),
  },
  {
    content: 'I always wondered how routing works. This post made it so clear!',
    user_id: 2,
    post_id: 3,
    last_modified: new Date(),
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
