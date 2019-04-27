const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
const images = require('./webpack/images');
const babel = require('./webpack/babel');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const common = merge([
    {
        entry: {
            "index": PATHS.source + '/main.js',
            "sw":  PATHS.source + '/cache_serviceworker.js',
        },
        output: {
            path: PATHS.build,
            filename: 'js/[name].js',
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
            HOST: JSON.stringify('http://127.0.0.1:8002'),
            HOST_CHAT: JSON.stringify('http://127.0.0.1:8003'),
            HOST_CHAT_WS: JSON.stringify('ws://127.0.0.1:8003'),
        }),
    ]
};

const prodMode = {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            HOST: JSON.stringify('https://api.colors.hackallcode.ru'),
            HOST_CHAT: JSON.stringify('https://api.colors.hackallcode.ru'),
            HOST_CHAT_WS: JSON.stringify('wss://212.109.199.140:8003'),
        }),
    ]
};

module.exports = function (env) {
    if (env === 'production') {
        return merge([
            common,
            extractCSS(),
            babel(),
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
