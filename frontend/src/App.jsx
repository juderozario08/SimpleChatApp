import React from "react"
import { connect, sendMessage } from "./api";
import './App.css';
import ChatHistory from "./Components/ChatHistory/ChatHistory";
import ChatInput from "./Components/ChatInput/ChatInput";


/**
 * @extends React.Component
 */
class App extends React.Component {
    /**
     * @typedef {Object} State
     * @property {string[]} chatHistory
     * */

    /** @type {State} */
    state = {
        chatHistory: []
    }

    /**
     * @param {string} e
     * */
    send = (e) => {
        sendMessage(e)
    }

    componentDidMount() {
        connect((msg) => {
            console.log("New Message")
            this.setState({ chatHistory: [...this.state.chatHistory, msg] })
        })
    }

    render() {
        return (
            <div className="App">
                <ChatHistory chatHistory={this.state.chatHistory} />
                <ChatInput send={this.send} />
            </div>
        );
    }
}

export default App;
