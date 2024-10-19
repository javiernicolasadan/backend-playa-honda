const express = require('express');
const { SitemapStream, streamToPromise } = require('sitemap');
const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
  try {
    const sitemap = new SitemapStream({ hostname: 'https://playa-honda.vercel.app/' });

    // Rutas principales de tu aplicación
    sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    sitemap.write({ url: '/apartment', changefreq: 'weekly', priority: 0.8 });
    sitemap.write({ url: '/gallery', changefreq: 'weekly', priority: 0.8 });
    sitemap.write({ url: '/activities', changefreq: 'weekly', priority: 0.7 });
    sitemap.write({ url: '/booking', changefreq: 'weekly', priority: 0.7 });
    sitemap.write({ url: '/weather', changefreq: 'weekly', priority: 0.7 });

    // Puedes agregar más rutas dinámicamente aquí si es necesario
    sitemap.end();

    const sitemapData = await streamToPromise(sitemap);
    res.header('Content-Type', 'application/xml');
    res.send(sitemapData.toString());
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating sitemap');
  }
});

module.exports = router;
