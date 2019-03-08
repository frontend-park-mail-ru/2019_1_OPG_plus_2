module.exports = function() {
    return {
      module: {
        rules: [
          {
            test: /\.(png|jpg|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader',
            options: {
                name: 'img/[name].[ext]'
                     },
                  },
              ],
          },
      };
  };