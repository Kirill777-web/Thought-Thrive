const { Post } = require('../models');

const postData = [
  {
    title: 'Understanding MVC Architecture in Web Development',
    content:
      'MVC, or Model-View-Controller, is a design pattern that helps in separating the logic of an application into three interconnected components. This article dives into the benefits and practical applications of MVC in modern web development.',
    date_created: new Date(),
    user_id: 1,
  },
  {
    title: 'Node.js and Express: Building Robust Web Applications',
    content:
      'Node.js, coupled with the Express framework, provides a solid foundation for building fast and scalable web applications. This post explores the core concepts of Node.js and Express, and how they revolutionize back-end development.',
    date_created: new Date(),
    user_id: 2,
  },
  {
    title: 'Effective Routing in Web Applications',
    content:
      'Routing is crucial in web applications to direct users to different pages. This post explores how routing works and how frameworks like Express.js handle routing efficiently.',
    date_created: new Date(),
    user_id: 1,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
