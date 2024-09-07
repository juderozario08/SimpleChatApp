import React, { Component } from "react";
import { Message } from "../../interface";
import MessageComponent from "../Message/Message";
import "./ChatHistory.css";

interface ChatHistoryProps {
	chatHistory: Message[];
}

class ChatHistory extends Component<ChatHistoryProps> {
	render() {
		return (
			<div id="chatHistory" className="h-[89vh] w-[63vw] scroll">
				{[...this.props.chatHistory].map((msg: Message, idx: any) => (
					<MessageComponent key={idx} message={msg} />
				))}
			</div>
		);
	}
}

export default ChatHistory;
