import React, { Component } from "react";
import { connect, sendMessage } from "./api";
import "./App.css";
import ChatHistory from "./components/ChatHistory/ChatHistory";
import Header from "./components/Header/Header";
import { Send } from "react-feather";

class App extends Component {
    state = {
        chatHistory: [],
    };

    constructor(props: any) {
        super(props);
    }

    setMessage(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ message: e.target.value });
    }

    send() {
        sendMessage("hello");
    }

    componentDidMount() {
        connect((msg: any) => {
            console.log("New Message");
            this.setState((_) => ({
                chatHistory: [...this.state.chatHistory, msg],
            }));
            console.log(this.state);
        });
    }

    render() {
        return (
            <div className="App">
                <Header />
                <ChatHistory chatHistory={this.state.chatHistory} />
                <div className="flex flex-row gap-2">
                    <button
                        className="rounded-3xl bg-slate-800 hover:bg-slate-700 p-[10px]"
                        onClick={this.send}
                    >
                        <Send width={15} height={15} />
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
