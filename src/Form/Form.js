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

            var req = new XMLHttpRequest()
            req.open("GET", url)
            req.send()

            req.onload = function() {
                if (req.status !== 200) {
                    console.log(req.status + ':' + req.status.text)
                } else {
                    console.log(req.responseText)
                }
            }

            // Fetch API gives me a CORS error in chrome
//            fetch(url, {method: "GET", headers: {"Content-Type": "text/plain"}}).then(response => response.json()).then(data => {
//                    var responseItem = {
//                        userName: 'Lisa',
//                        message: data.message
//                    }
//                    console.log(responseItem.message)
//                    this.addMessage(responseItem)
//                })
            // addMessage(newItem)
            // send message to Bot, and attach callBack this.addMessage(message)
//            this.setState({message: ''})
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