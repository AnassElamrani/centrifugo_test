const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const CENTRIFUGO_API_URL = 'http://localhost:8000/api';
const CENTRIFUGO_API_KEY = 'your_centrifugo_api_key';  // Replace with your API key

// Function to publish data to Centrifugo
const publishToCentrifugo = async (data) => {
  try {
    await axios.post(
      CENTRIFUGO_API_URL + '/publish',
      {
        channel: 'updates',
        data: data,
      },
      {
        headers: {
          Authorization: `apikey ${CENTRIFUGO_API_KEY}`,
        },
      }
    );
  } catch (error) {
    console.error('Error publishing to Centrifugo:', error);
  }
};

// API endpoint to send data to Centrifugo
app.post('/send-data', (req, res) => {
  const newData = req.body;
  publishToCentrifugo(newData);
  res.status(200).json({ message: 'Data sent to Centrifugo', data: newData });
});

app.listen(4000, () => {
  console.log('Backend running on port 4000');
});
