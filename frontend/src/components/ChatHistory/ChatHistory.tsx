import React, { Component } from "react";

interface Message {
    data: string;
}

interface ChatHistoryProps {
    chatHistory: Message[];
}

class ChatHistory extends Component<ChatHistoryProps> {
    render() {
        return (
            <div>
                <h1 className="text-2xl font-bold py-3">Chat History</h1>
                {this.props.chatHistory.map((msg: any, idx: any) => (
                    <p key={idx}>{msg.data}</p>
                ))}
            </div>
        );
    }
}

export default ChatHistory;
