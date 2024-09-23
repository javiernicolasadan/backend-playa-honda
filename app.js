const cors = require('cors');
const express = require('express');
const app = express();
const weatherRoutes = require('./routes/WeatherBack');
require('dotenv').config();

app.use(cors());

app.use('/api', weatherRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Backend corriendo en el puerto 3000');
});

