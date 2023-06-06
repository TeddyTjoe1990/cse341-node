const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Teddy Tjoe is here!!!');
});

module.exports = routes;