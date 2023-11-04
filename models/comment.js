const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    last_modified: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    post_id: {
      // Add this field
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post', // Ensure this matches your posts table name
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
