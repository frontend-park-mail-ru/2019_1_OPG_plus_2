const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function() {
    return {
        module: {
            rules: [
              {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader', options: {
                            implementation: require("sass")
                    }}
                ],
              },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "style.css",
            }),
            new OptimizeCssAssetsPlugin({
              assetNameRegExp: /\.optimize\.css$/g,
              cssProcessor: require('cssnano'),
              cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
              },
              canPrint: true
            })
          ]
    }
};
