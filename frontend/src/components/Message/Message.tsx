import React, { Component } from "react";
import { Message } from "../../interface";

interface MessageProps {
	message: Message;
}

class MessageComponent extends Component<MessageProps> {
	render() {
		return (
			<div>
				{this.props.message.Type === 1 ? (
					<h1>{this.props.message.Body}</h1>
				) : null}
			</div>
		);
	}
}

export default MessageComponent;
