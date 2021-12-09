const jwt = require('jsonwebtoken');

module.exports.parseJwt = (token) => {
  try {
    return jwt.decode(token);
  } catch (e) {
    return null;
  }
};
