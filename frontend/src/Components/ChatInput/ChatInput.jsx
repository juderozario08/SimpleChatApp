import React from "react"
import "./ChatInput.css"

class ChatInput extends React.Component {
    state = {
        message: ""
    }
    render() {
        return (
            <div className="ChatInput">
                <input id="input" onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        this.props.send(e.target.value)
                        e.target.value = ""
                    }
                }} onChange={e => this.setState({ message: e.target.value })} />
                <button onClick={() => {
                    this.props.send(this.state.message)
                    document.getElementById("input").value = ""
                    this.setState({ message: "" })
                }}>Hit</button>
            </div>
        )
    }
}

export default ChatInput
