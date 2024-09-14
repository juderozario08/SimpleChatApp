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
     * @property {string} name
     * */

    /** @type {State} */
    state = {
        chatHistory: [],
        name: ""
    }

    /**
     * @param {string} msg
     * */
    send = (msg) => {
        sendMessage(`${msg}`)
    }


    componentDidMount() {
        connect(
            (msg) => {
                console.log("New Message:", msg);
                this.setState(prevState => {
                    console.log("Updating chat history:", [...prevState.chatHistory, msg]);
                    return { chatHistory: [...prevState.chatHistory, msg] };
                });
            },
            (n) => {
                console.log("Assigning name:", n);
                this.setState({ name: n });
            }
        );
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
