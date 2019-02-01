import React, {Component} from 'react';
import './Message.css';

class Message extends Component {
    render(){
        return (
            <div className={this.props.userName === "Lisa" ? "talk-bubble tri-right round left-in" : "talk-bubble align-right tri-right round right-in"}>
                <div className="talktext">
                    <p><span>{this.props.userName}: </span>{this.props.message}</p>
                </div>
            </div>
        )
    }
}

export default Message;