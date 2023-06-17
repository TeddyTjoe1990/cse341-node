const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Contacts API'
  },
  host: 'teddy1990.onrender.com',
  schemes: ['https']
};

const outputFile = 'swagger.json';
const endpointsFiles = ['routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
