// Servidor estático simples só para pré-visualização local (sem dependências).
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PORT = process.env.PORT || 4173;

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain' };

http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath === '/') urlPath = '/index.html';
    let filePath = join(ROOT, urlPath);
    try {
      const s = await stat(filePath);
      if (s.isDirectory()) filePath = join(filePath, 'index.html');
    } catch {
      filePath = join(ROOT, '404.html');
      res.statusCode = 404;
    }
    const data = await readFile(filePath);
    res.setHeader('Content-Type', TYPES[extname(filePath)] || 'application/octet-stream');
    res.end(data);
  } catch (e) {
    res.statusCode = 500;
    res.end('Server error: ' + e.message);
  }
}).listen(PORT, () => console.log('Dev server running at http://localhost:' + PORT));
