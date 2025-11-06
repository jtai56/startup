const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');

const app = express();

var apiRouter = express.Router()

const authCookieName = 'token';

let users = [];
let scores = [];

const port = process.argv.length > 2 ? process.argv[2] : 3000;


// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
app.use(`/api`, apiRouter);

// Define helper functions BEFORE they're used
async function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);
  return user;
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: false, // idk why this was set to true
    httpOnly: true,
    sameSite: 'strict',
  });
}

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res, next) => {
  try {
    if (await findUser('email', req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await createUser(req.body.email, req.body.password);

      setAuthCookie(res, user.token);
      res.send({ email: user.email });
    }
  } catch (err) {
    next(err);
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res, next) => {
  try {
    const user = await findUser('email', req.body.email);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        res.send({ email: user.email });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  } catch (err) {
    next(err);
  }
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res, next) => {
  try {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

apiRouter.get('/quote', async (req, res, next) => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();
    console.log('Quote fetched:', data);
    res.json(data);
  } catch (err) {
    console.error('Error fetching quote:', err);
    res.status(500).send({ error: 'Failed to fetch quote' });
  }
});

// error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});