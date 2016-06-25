/*
* @Author: cj
* @Date:   2016-06-25 10:58:03
* @Last Modified by:   cj
* @Last Modified time: 2016-06-25 11:00:01
*/

var path = require("path")

module.exports = {
  entry: {
    app: "./src/app.jsx",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel?presets[]=es2015&presets[]=react",
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,
        loader: "style!css!stylus",
        exclude: /node_modules/,
      },
    ],
  },
}
