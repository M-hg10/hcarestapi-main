const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("123456", 10),
    role: "admin"
  },
  {
    id: 2,
    username: "user",
    password: bcrypt.hashSync("123456", 10),
    role: "user"
  }
];

module.exports = users;
