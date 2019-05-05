const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function() {
    return {
        module: {
            rules: [
              {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader', options: {
                            implementation: require("sass")
                    }}, {loader: 'postcss-loader'}
                ],
              }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "style.css",
            })
        ]
    }
};
