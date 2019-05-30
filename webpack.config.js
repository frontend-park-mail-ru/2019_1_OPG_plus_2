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
            // "sw":  PATHS.source + '/cache_serviceworker.js',
        },
        output: {
            path: PATHS.build,
            filename: 'js/[name].js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: PATHS.source + '/index.pug',
                inject: false,
            }),
        ],
    },
    pug(),
    images(),
]);

const dev = {
    optimization: {
        minimize: true,
    },
    devtool: "eval",
};

const prod = {
    optimization: {
        minimize: true,
    },
}

const devMode = {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            HOST: JSON.stringify('http://localhost:8002'),
            MY_HOST: JSON.stringify('http://localhost:8001'),
            HOST_MULTIPLAYER_WS: JSON.stringify('ws://127.0.0.1:8004/game'),
            HOST_MULTIPLAYER: JSON.stringify('http://localhost:8004/game'),
        }),
    ]
};

const prodMode = {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            HOST: JSON.stringify('https://api.colors.hackallcode.ru'),
            HOST_MULTIPLAYER_WS: JSON.stringify('wss://api.colors.hackallcode.ru'),
        }),
    ]
};

module.exports = function (env) {
    if (env === 'production') {
        return merge([
            common,
            extractCSS(),
            babel(),
            prod,
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
