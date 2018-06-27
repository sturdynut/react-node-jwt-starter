const express = require('express');
const { createJwtToken } = require('./auth');
const app = express();
const router = express.Router();

router.get('/auth', (req, res) => {
  const token = createJwtToken({
    email: 'test@test.com'
  });
  res.send({
    token: token
  });
});

app.use('/api', router);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'dist', });
  });
}

app.listen(3000, (err) => {
  if (err) {
    console.log('err starting server', err);
  } else {
    console.log('Serving from port 3000');
  }
})