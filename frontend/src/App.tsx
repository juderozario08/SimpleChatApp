import React, { Component } from "react";
import { connect, sendMessage } from "./api";
import "./App.css";
import ChatHistory from "./components/ChatHistory/ChatHistory";
import Header from "./components/Header/Header";
import ChatInput from "./components/ChatInput/ChatInput";

class App extends Component {
    state = {
        chatHistory: [],
        msg: "",
    };

    setMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ msg: e.target.value });
    };

    send = () => {
        if (this.state.msg.trim().length > 0) {
            sendMessage(this.state.msg);
            this.setState({ msg: "" });
        }
    };

    componentDidMount() {
        connect((msg: any) => {
            console.log("New Message");
            this.setState((_) => ({
                chatHistory: [...this.state.chatHistory, JSON.parse(msg.data)],
            }));
        });
    }

    render() {
        return (
            <div className="App h-full">
                <Header />
                <ChatHistory chatHistory={this.state.chatHistory} />
                <ChatInput
                    msg={this.state.msg}
                    setMessage={this.setMessage}
                    send={this.send}
                />
            </div>
        );
    }
}

export default App;
