const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const eventRoutes = require('./routes/events');

const app = express();
const dbUrl = 'mongodb://127.0.0.1:27017/testDecode';

mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connected to the database'))
  .catch(error => console.error('Error connecting to the database', error));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 8032;

app.use('/api', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
