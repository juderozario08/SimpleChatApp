import React, { Component } from "react";
import { Message } from "../../interface";
import MessageComponent from "../Message/Message";

interface ChatHistoryProps {
    chatHistory: Message[];
}

class ChatHistory extends Component<ChatHistoryProps> {
    render() {
        return (
            <div>
                <h1 className="text-2xl font-bold py-3">Chat History</h1>
                {this.props.chatHistory.map((msg: Message, idx: any) => (
                    <MessageComponent key={idx} message={msg} />
                ))}
            </div>
        );
    }
}

export default ChatHistory;
