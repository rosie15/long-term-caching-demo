/*
* @Author: cj
* @Date:   2016-06-25 10:58:03
* @Last Modified by:   CJ Ting
* @Last Modified time: 2016-06-25 11:41:55
*/

var path = require("path")
var fs = require("fs")

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
  plugins: [
    function() {
      copyFile("html/index.dev.html", "dev/index.html")
    },
  ],
}

function copyFile(from, to) {
  var content = fs.readFileSync(from, "utf8")
  fs.writeFileSync(to, content)
}
