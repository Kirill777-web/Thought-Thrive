const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  //This method will check the password as provided in the login route against the hashed password in the database.
  //If we dont have this code then the password will not be hashed and the user will not be able to login
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
//This is the model for the user table
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      //validate means that the password must be at least 8 characters long
      validate: {
        len: [8],
      },
    },
  },
  {
    //hooks: are callback functions that are called before and after calls in sequelize are executed
    //We need them to hash the password before it is created or updated
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      //beforeUpdate is called before an update is made to the database
      //It hashes the password before it is updated
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },

    //Here we are passing in our imported sequelize connection (the direct connection to our database)
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
