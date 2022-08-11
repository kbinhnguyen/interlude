require('dotenv').config();
const next = require('next');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // define dynamic page routing
  server.get('/user/:id', (req, res) => {
    app.render(req, res, '/user', { id: req.params.id });
  });

  // hand rendering control of all other pages over to NextJS
  server.get('*', (req, res) => (handle(req, res)));

  server.listen(process.env.HTML_SERVER_PORT, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Currently serving port ${process.env.HTML_SERVER_PORT}`);
    }
  });
});
