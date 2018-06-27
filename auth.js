const jwt = require('jsonwebtoken');

function createJwtToken(user) {
  return jwt.sign(
    {
      user,
      iss: 'Issuer Name - This would be your app',
    },
    'super-secret',
    {
      algorithm: 'HS256',
      expiresIn: '1h',
    }
  );
}

module.exports = {
  createJwtToken
};
