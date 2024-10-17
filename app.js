const cors = require('cors');
const express = require('express');
const app = express();
const weatherRoutes = require('./routes/WeatherBack');
const sitemapRoutes = require('./routes/SitemapRoutes');  // Ruta del sitemap
require('dotenv').config();

app.use(cors({
  origin: '*'
}));

// Rutas para la API del clima
app.use('/api', weatherRoutes);

// Ruta para el sitemap.xml
app.use('/api', sitemapRoutes);  // /api/sitemap

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Backend corriendo en el puerto ${port}`);
});
