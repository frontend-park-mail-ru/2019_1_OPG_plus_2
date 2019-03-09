module.exports = function(paths) {
    return {
        module: {
            rules: [{
                test: /\.(sa|sc|c)ss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        implementation: require("sass")
                    }
                }]
            }]
        }
    }
}