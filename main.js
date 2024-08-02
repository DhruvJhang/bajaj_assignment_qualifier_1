// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const userDetails = {
  user_id: "dhruv_jhang_30102003",
  email: "ds3142@srmist.edu.in",
  roll_number: "RA2111027020004",
};

app.post('/bhfl', (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ is_success: false, message: 'Invalid request payload' });
  }

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));

  const highestAlphabet = alphabets.length > 0 
    ? [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)]
    : [];

  const response = {
    is_success: true,
    ...userDetails,
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet,
  };

  res.status(200).json(response);
});

// GET method endpoint
app.get('/bhfl', (req, res) => {
  const operationCode = { operation_code: '1' };
  res.status(200).json(operationCode);
});

app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});