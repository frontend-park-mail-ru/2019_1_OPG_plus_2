module.exports = function() {
  return {
      module: {
          rules: [
              {
                  test: /\.(jpg|png|svg)$/,
                  loader: 'file-loader',
                  options: {
                      username: 'img/[username].[ext]'
                  },
              },
          ],
      },
  };
};