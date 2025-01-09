const express = require('express');
const cors = require('cors');  // Import the cors package
const axios = require('axios');

const app = express();
app.use(cors());  // Use the cors middleware
app.use(express.json());

async function verifyToken(req, res, next) {
  let token = req.headers['authorization'];
  console.log(`Received Token: ${token}`);
  if (!token) return res.status(403).send('Token required');

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  try {
    const response = await axios.get('http://localhost:3000/verify', {
      headers: { 'Authorization': token }
    });
    console.log(`Verification Response: ${JSON.stringify(response.data)}`);
    req.user = response.data;
    next();
  } catch (err) {
    console.error('Token Verification Error:', err);
    res.status(401).send('Invalid token');
  }
}

app.get('/feature1', verifyToken, (req, res) => {
  res.send({ message: 'This is Feature 1' });
});

app.get('/feature2', verifyToken, (req, res) => {
  res.send({ message: 'This is Feature 2' });
});

app.listen(4000, () => {
  console.log('Feature service running on port 4000');
});
