const express = require('express');

let app = express();
app.use(express.static('public'));

let port = 8000;

console.log("Serving at port:", port);
app.listen(port);