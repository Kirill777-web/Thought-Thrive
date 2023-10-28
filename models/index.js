const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

//This indicates that a single user can have multiple posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
//This shows that a user can have multiple comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
//This establishes that each post belongs to a single user
Post.belongsTo(User, {
  foreignKey: 'user_id',
});
//This indicates that a post can have multiple comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});
//This specifies that each comment belongs to a single post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});
//This indicates that each comment belongs to a single user.
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

//This exports the User, Post, and Comment models
module.exports = { User, Post, Comment };
