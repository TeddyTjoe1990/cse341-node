const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use('/', require('./backend/controllers'))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})