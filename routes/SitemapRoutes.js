const express = require('express');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');

const router = express.Router();

router.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');

  const smStream = new SitemapStream({ hostname: 'https://playa-honda.vercel.app' });
  const pipeline = smStream.pipe(createGzip());

  // Definir las rutas
  smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  smStream.write({ url: '/apartment', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/gallery', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/activities', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/booking', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/weather', changefreq: 'daily', priority: 0.9 });

  smStream.end();  // Finalizar el stream

  // Enviar el sitemap comprimido
  streamToPromise(pipeline)
    .then(sm => res.send(sm))
    .catch((error) => {
      console.error(error);
      res.status(500).end();
    });
});

module.exports = router;
