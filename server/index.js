'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
// const fallback = require('express-history-api-fallback');
const app = express();
const root = path.resolve(__dirname, '..', 'build');
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'build')));
// app.use(fallback('index.html', {root}));
app.get('*', (req, res) => {
    // if (req.path === "/sw.js"){
    //     res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    //     res.sendFile(path.join(__dirname, '../build/js/sw.js'));
    //     return;
    // }
    console.log(express.static(path.resolve(__dirname, '..', 'build')));
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

const port = process.env.PORT || 8001;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
