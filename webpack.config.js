const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

module.exports = {
    entry: PATHS.source + '/main.js',
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Colors'
        })
    ]
};