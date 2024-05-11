const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;
const encoding = 'utf-8';

const handleRequest = (file, res) => {
  fs.readFile(file , encoding, (err, data) => {
    if (err) 
      console.error(err);

    res.write(data);
    res.end();
  });
}

app.get('/', (req, res) => {
  handleRequest('./index.html', res);
});

app.get('/about', (req, res) => {
  handleRequest('./about.html', res);
});

app.get('/contact', (req, res) => {
  handleRequest('./contact-me.html', res);
});

app.use((req, res, next) => {
  fs.readFile('./404.html', encoding, (err, data) => {
    res.status(404).write(data);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
