const express = require('express');
const jwt = require('express-jwt');
const jsonWebToken = require('jsonwebtoken');
const app = express();
const router = express.Router();

const secret = 'super-secret';

function createJwtToken(user) {
  return jsonWebToken.sign(
    {
      user,
      iss: 'Issuer Name - This would be your app',
    },
    secret,
    {
      algorithm: 'HS256',
      expiresIn: '1h',
    }
  );
}

router.post('/auth', (req, res) => {
  const token = createJwtToken({
    email: 'test@test.com'
  });
  res.send({
    token: token
  });
});

router.get('/dataz', (req, res) => {
  res.send([
    { id: 1, name: 'test 1' },
    { id: 2, name: 'test 2' },
    { id: 3, name: 'test 3' },
  ]);
})

app.use('/api', router);

app.use('/api', jwt({ secret, }).unless({
  path: [ '/api/auth' ],
}));

// // Express only serves static assets in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('dist'));

//   app.get('*', (req, res) => {
//     res.sendFile('index.html', { root: 'dist', });
//   });
// }

const port = process.env.PORT || 5001;

app.listen(port, (err) => {
  if (err) {
    console.log('err starting server', err);
  } else {
    console.log(`Serving from port ${port}`);
  }
})