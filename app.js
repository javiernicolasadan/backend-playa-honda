const cors = require('cors');
const express = require('express');
const app = express();
const weatherRoutes = require('./routes/weatherBack.js');
const sitemapRoutes = require('./routes/sitemapRoutes.js');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());  // Para asegurarnos de que Express maneja JSON

// Ruta de prueba para ver si el backend está funcionando
app.get('/test', (req, res) => {
  console.log("Ruta de prueba solicitada");
  res.send('Ruta de prueba funcionando');
});

// Rutas para el clima y el sitemap
app.use('/api', weatherRoutes);
app.use('/', sitemapRoutes);
// Comment for redeploy
// Ruta por defecto para el favicon y otras rutas estáticas (opcional)
app.use(express.static('public'));

// Servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend corriendo en el puerto ${port}`);
});
