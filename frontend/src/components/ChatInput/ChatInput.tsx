import React, { Component } from "react";
import { Send } from "react-feather";
import { ChatInputProps } from "../../interface";

class ChatInput extends Component<ChatInputProps> {
	render() {
		return (
			<div className="flex flex-row gap-2 bottom-4 absolute">
				<input
					value={this.props.msg}
					onChange={this.props.setMessage}
					onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
						if (event.keyCode === 13) {
							this.props.send(this.props.msg);
						}
					}}
					className="bg-slate-800 rounded-3xl px-4 w-[60vw]"
				/>
				<button
					className="rounded-3xl bg-slate-800 hover:bg-slate-700 p-[10px]"
					onClick={this.props.send}
				>
					<Send width={15} height={15} />
				</button>
			</div>
		);
	}
}

export default ChatInput;
