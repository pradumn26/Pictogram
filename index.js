const express = require('express');

const app = express();

const PORT = process.env.NODE_ENV || 5000;
app.listen(PORT, () => {
    console.log(`app is hosted on: ${PORT}`);
});