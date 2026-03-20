const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('Missing ?url=');
  try {
    const response = await fetch(decodeURIComponent(target), {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const body = await response.buffer();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', response.headers.get('content-type') || 'text/html');
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');
    res.send(body);
  } catch(e) {
    res.status(500).send('Error: ' + e.message);
  }
};
