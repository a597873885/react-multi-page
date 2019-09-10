import "./index.scss"
import React from "react"
import ReactDom from "react-dom"

class Main extends React.Component {
    constructor(props) {
      super(props)
    }
    componentDidMount() {
    }
    render() {
        return <div className="home-container">
                这个是首页
        </div>
    }
}


ReactDom.render(<Main />, document.getElementById("root"))

