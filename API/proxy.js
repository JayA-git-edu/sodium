module.exports = async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('Missing ?url=');
  try {
    const r = await fetch(decodeURIComponent(target), {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const body = await r.arrayBuffer();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', r.headers.get('content-type') || 'text/html');
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');
    res.send(Buffer.from(body));
  } catch(e) { res.status(500).send(e.message); }
};
```

**3. Test it directly in your browser:**

Go to:
```
https://sodium-site.vercel.app/api/proxy?url=https://example.com
