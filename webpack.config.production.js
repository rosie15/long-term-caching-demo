/*
* @Author: CJ Ting
* @Date:   2016-06-25 11:33:45
* @Last Modified by:   CJ Ting
* @Last Modified time: 2016-06-25 17:20:59
*/

var path = require("path")
var webpack = require("webpack")
var devConfig = require("./webpack.config.js")
var WebpackMd5Hash = require("webpack-md5-hash")
var fs = require("fs")

module.exports = {
  entry: {
    app: "./src/app.jsx",
    vendors: [
      "react",
      "react-dom",
    ],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.[chunkhash].js",
  },
  module: devConfig.module,
  plugins: [
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors",
      minChunks: Infinity,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    function() {
      this.plugin("done", function(stats) {
        if (stats.toJson().errors.length === 0) {
          copyFile("html/index.html", "dist/index.html")
          var assets = stats.toJson().assetsByChunkName
          var appName = assets.app
          var vendorsName = assets.vendors
          replaceInFile("dist/index.html", "<app_js>", appName)
          replaceInFile("dist/index.html", "<vendors_js>", vendorsName)
        }
      })
    },
  ],
}

function copyFile(from, to) {
  var content = fs.readFileSync(from, "utf8")
  fs.writeFileSync(to, content)
}

function replaceInFile(filePath, regexp, replacement) {
  var replacer = function (match) {
    console.log("\nReplacing in %s: %s => %s", filePath, match, replacement)
    return replacement
  }
  var content = fs.readFileSync(filePath, "utf8")
  var out = content.replace(new RegExp(regexp, "g"), replacer)
  fs.writeFileSync(filePath, out)
}

