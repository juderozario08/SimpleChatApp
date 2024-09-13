import React from 'react'
import Message from '../Message/Message'

class ChatHistory extends React.Component {

    render() {
        return (
            <div className=''>
                <h2>Chat History</h2>
                {
                    this.props.chatHistory.map((msg, index) => (
                        <Message key={index} message={msg.data} />
                    ))
                }
            </div>
        )
    }
}

export default ChatHistory
