const path = require('path')

module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    options: {
                        pretty: true,
                        root: path.join(__dirname, '../src'),
                    }
                }
            ]
        }
    }
};