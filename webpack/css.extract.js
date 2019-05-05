const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function() {
    return {
        module: {
            rules: [
              {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {loader: 'postcss-loader'},
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader', options: {
                            implementation: require("sass")
                    }}
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
