const http = require('http');
const url = require('url');
const fs = require('fs/promises');

const hostname = 'localhost';
const port = 8080;
const encoding = 'utf-8';

const processRequest = (data, res, statusCode = 200) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'text/html');
  res.write(data);
  res.end();
}

const server = http.createServer(async (req, res) => {
  const adr = url.parse(req.url, true);

  try {
    switch (adr.pathname) {
      case '/': {
        const file = await fs.readFile('./index.html', encoding);
        processRequest(file, res);
        break;
      }
      case '/about': {
        const file = await fs.readFile('./about.html', encoding);
        processRequest(file, res);
        break;
      }    
      case '/contact-me': {
        const file = await fs.readFile('./contact-me.html', encoding);
        processRequest(file, res);
        break;
      }    
      default: {
        throw new Error('404 not found');
      }        
    }

  } catch {
    const file = await fs.readFile('./404.html', encoding);
    processRequest(file, res, 404);
  } 
});

server.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}`);
});
