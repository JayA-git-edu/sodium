const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/', async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('Missing ?url=');

  try {
    const response = await fetch(target, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const body = await response.buffer();
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', response.headers.get('content-type') || 'text/html');
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');
    res.send(body);
  } catch (e) {
    res.status(500).send('Proxy error: ' + e.message);
  }
});

app.listen(process.env.PORT || 3000);
