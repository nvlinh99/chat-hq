const bcrypt = require('bcryptjs');

const round = 10;

exports.createHashedPassword = async (password) => {
  return bcrypt.hash(password, round);
};

exports.verifyHashedPassword = async (rawPassword, hashedPassword) => {
  return bcrypt.compare(rawPassword, hashedPassword);
};