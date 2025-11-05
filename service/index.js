const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
import cors from 'cors';


const app = express();
app.use(cors());

var apiRouter = express.Router()

apiRouter.get('/api/quotes', async (req, res) => {
  const response = await fetch('https://zenquotes.io/api/random');
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log('Server running on port 3000'));