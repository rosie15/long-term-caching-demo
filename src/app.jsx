/*
* @Author: cj
* @Date:   2016-06-25 10:55:23
* @Last Modified by:   CJ Ting
* @Last Modified time: 2016-06-25 17:38:53
*/

import React from "react"
import DOM from "react-dom"

import "./app.styl"

const App = React.createClass({
  render() {
    return (
      <h1>Hello World</h1>
    )
  },
})

DOM.render(<App />, document.getElementById("app-container"))
