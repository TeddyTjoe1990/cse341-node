const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use('/', require('./controllers'))

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})