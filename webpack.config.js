module.exports = {
  context: __dirname,
  entry: "./index",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    library: "findMauerside",
    libraryTarget: "commonjs2"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'json'
      }
    ]
  }
}
