const express = require('express');
const jwt = require('express-jwt');
const jsonWebToken = require('jsonwebtoken');
const app = express();
const router = express.Router();

// Salt used with hash when creating JWT token
const secret = process.env.SECRET;

// Create JWT token
// This function would be better placed in another file
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

// We also pass the jwt middleware to authenticate our routes that start with /api
// Note the usage of "unless" to allow for the api/auth route to be hit
// without an Authorization header
app.use('/api', jwt({ secret }).unless({
  path: [ '/api/auth' ],
}));

// Route to authenticate user
// You would typically retrieve the username/password/apikey and authenticate that against your database/etc.
// Then you would call the createJwtToken(...) with the data you'd like to have available in the future
// for subsequent requests for authorization and identification.
router.post('/auth', (req, res) => {
  const token = createJwtToken({
    email: 'test@test.com'
  });
  res.send({
    token: token
  });
});

// Example route
router.get('/dataz', (req, res) => {
  // The JWT middleware adds the "user" object 
  // to the req when there is a valid jwt token
  console.log('req.user', req.user);
  
  res.send([
    { id: 1, name: 'test 1' },
    { id: 2, name: 'test 2' },
    { id: 3, name: 'test 3' },
  ]);
});

// Tell Express to route requests coming in at /api to use
// the routes we just setup.
app.use('/api', router);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'client/build', });
  });
}

const port = process.env.PORT || 5001;

app.listen(port, (err) => {
  if (err) {
    console.log(`Err starting server: ${err}`, err);
  } else {
    console.log(`Serving from port ${port}`);
  }
})