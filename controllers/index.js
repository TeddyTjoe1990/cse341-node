const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Permata Sari');
});

module.exports = routes;