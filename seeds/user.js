const { User } = require('../models');

const userData = [
  {
    username: 'AliceTech',
    password: '$2b$10$va7xm8PfkD22xilPeMYROeYXbCff8ismjlzzOMyjZqiQHUqUUzFuu',
  },
  {
    username: 'BobCoder',
    password: '$2b$10$s2hjzV9vVTMn1YojJoybVORw39EA0bzua9C.h9KXF8OD60YkER0hu',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
