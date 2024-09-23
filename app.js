const cors = require('cors');
const express = require('express');
const app = express();
const weatherRoutes = require('./routes/WeatherBack');
require('dotenv').config();

app.use(cors());

app.use('/api', weatherRoutes);

app.listen(3000, () => {
  console.log('Backend corriendo en el puerto 3000');
});

