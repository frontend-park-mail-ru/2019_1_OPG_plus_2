const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
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
            }),
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

const devMode = {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            ORIGIN: JSON.stringify('http://localhost:8001'),
            HOST: 'http://localhost:8002',
        }),
    ]
}

const prodMode = {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            ORIGIN: JSON.stringify('https://colors.hackallcode.ru'),
            HOST: 'https://api.colors.hackallcode.ru',
        }),
    ]
}

module.exports = function(env) {
    if (env === 'production') {
        return merge([
            common,
            extractCSS(),
            prodMode,
        ]);
    }
    if (env === 'development') {
        return merge([
            common,
            devserver(),
            sass(),
            dev,
            devMode,
        ])
    }
};