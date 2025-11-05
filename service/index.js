const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');

const app = express();

var apiRouter = express.Router()

app.use(`/api`, apiRouter)
apiRouter.get('/quote', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();
    console.log('Quote fetched:', data);
    res.json(data)
  } catch (err) {
    console.error('Error fetching quote:', err);
    res.status(500).send({ error: 'Failed to fetch quote' });
  }
});


app.listen(3000, () => console.log('Server running on port 3000'));