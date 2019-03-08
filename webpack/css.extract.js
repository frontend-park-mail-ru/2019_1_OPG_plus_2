const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function() {
    return {
        module: {
            rules: [
              {
                test: /\.(sa|sc|c)ss$/,
                use: [
                   MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader',
                //   'sass',
                ],
              }
            ]
        }
    }
}