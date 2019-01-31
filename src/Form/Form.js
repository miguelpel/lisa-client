import React, {Component} from 'react';
import './Form.css';
import Message from '../Message/Message';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: 'Miguel',
            message: '',
            messageList: []
        };
        //this.listenMessages()
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.user){
            this.setState({userName: nextProps.user.displayName}) // ???
        }
    }

    handleChange(event){
        this.setState({message: event.target.value});
    }

    handleSend(){
        if (this.state.message) {
            var newItem = {
                userName: this.state.userName,
                message: this.state.message
            }

            const lisaUrl = 'https://lisa-server.herokuapp.com/superscript?'
            const whitespaceRegExp = new RegExp('/\s/g')
            const url = newItem.message.match(whitespaceRegExp) ?
            `${lisaUrl}user=${newItem.userName}&message="${newItem.message}"`:
            `${lisaUrl}user=${newItem.userName}&message=${newItem.message}`
            console.log(url)

           fetch(url, {method: "GET",})
               .then(response => response.json())
               .then(item => {        
                   console.log(item)
                // this.addMessage(item)
               })
        }
    }

    handleKeyPress(event){
        if (event.key !== 'Enter') return;
        this.handleSend();
    }

    addMessage(item){
        // item.userName
        // item.message
        // (+ mood) ???
        var newMessage = item.message
        var messages = this.state.messageList.slice(0).push(newMessage)
        this.setState({messageList: messages})
    }

    render(){
        return(
            <div className="form">
                <div className="form_message">
                    {this.state.messageList.map((item, index) => <Message key={index} message={item} />)}
                </div>
                <div className="form_row">
                    <input
                        className="form_input"
                        type="text"
                        placeholder="Type Message"
                        value={this.state.message}
                        onChange={event => this.handleChange(event)}
                        onKeyPress={event => this.handleKeyPress(event)}
                    />
                    <button
                        className="form_button"
                        onClick={event => this.handleSend(event)}
                    >
                        send
                    </button>
                </div>
            </div>
        )
    }
}

export default Form;