const cors = require('cors');
const express = require('express');
const app = express();
const weatherRoutes = require('./routes/WeatherBack');
require('dotenv').config();

app.use(cors({
  origin: 'https://playa-honda.vercel.app/'
}));


app.use('/api', weatherRoutes);

const port = process.env.PORT || 3000;

//app.get('/test', (req, res) => {
 // res.send('Ruta de prueba funcionando');
//});

app.listen(port, () => {
  console.log('Backend corriendo en el puerto 3000');
});

