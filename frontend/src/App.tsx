import React, { Component } from "react";
import { connect, sendMessage } from "./api";
import "./App.css";

class App extends Component {
    constructor(props: any) {
        super(props);
        connect();
    }
    send() {
        sendMessage("Hello");
    }

    render() {
        return (
            <div className="main">
                <h1 className="text-3xl">Welcome to realtime chat app</h1>
                <input
                    className="bg-slate-800 shadow shadow-white p-1"
                    placeholder="Enter Text"
                />
                <button
                    className="bg-slate-700 p-1 rounded hover:bg-slate-800"
                    onClick={this.send}
                >
                    Send Message
                </button>
            </div>
        );
    }
}

export default App;
