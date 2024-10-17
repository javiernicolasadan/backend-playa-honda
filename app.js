const cors = require('cors');
const express = require('express');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');
const app = express();
const weatherRoutes = require('./routes/WeatherBack');
require('dotenv').config();

app.use(cors({
  origin: '*'
}));

app.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');

  const smStream = new SitemapStream({ hostname: 'https://playa-honda.vercel.app' });  // Cambia a tu dominio
  const pipeline = smStream.pipe(createGzip());

  // Aquí agregas las rutas que deseas incluir en el sitemap
  smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  smStream.write({ url: '/apartment', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/gallery', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/activities', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/booking', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/weather', changefreq: 'daily', priority: 0.9 });

  smStream.end();  // Finalizamos el stream

  // Enviamos el sitemap comprimido
  streamToPromise(pipeline).then(sm => res.send(sm)).catch(console.error);
});


app.use('/api', weatherRoutes);

const port = process.env.PORT || 3000;

//app.get('/test', (req, res) => {
 // res.send('Ruta de prueba funcionando');
//});

app.listen(port, () => {
  console.log('Backend corriendo en el puerto 3000');
});

