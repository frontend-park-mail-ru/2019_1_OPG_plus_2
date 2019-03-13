const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
const images = require('./webpack/images');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const common = merge([
    {
        entry: PATHS.source + '/main.js',
        output: {
            path: PATHS.build,
            filename: 'js/[username].js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: PATHS.source + '/index.pug',
            })
        ],
    },
    pug(),
    images(),

]);

const dev = {
    optimization: {
        minimize: false
    },
    devtool: "eval",
};

module.exports = function(env) {
    if (env === 'production') {
        return merge([
            common,
            extractCSS(),
        ]);
    }
    if (env === 'development') {
        return merge([
            common,
            devserver(),
            sass(),
            dev,
        ])
    }
};