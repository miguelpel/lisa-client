import React, {Component} from 'react';
import './Message.css';

class Message extends Component {
    render(){
        return (
            <div className="message_author">
                <span className="message_author">
                    {this.props.userName}:
                </span>
                {this.props.message}
            </div>
        )
    }
}

export default Message;