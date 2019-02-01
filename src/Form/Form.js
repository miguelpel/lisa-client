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

            this.addMessage(newItem)

            const lisaUrl = 'https://lisa-server.herokuapp.com/superscript?'

            // UNNECESSARY
            // const whitespaceRegExp = new RegExp('/\s/g')
            // const url = newItem.message.match(whitespaceRegExp) ?
            // `${lisaUrl}user=${newItem.userName}&message="${newItem.message}"`:
            // `${lisaUrl}user=${newItem.userName}&message=${newItem.message}`

            const url = `${lisaUrl}user=${newItem.userName}&message=${newItem.message}`

            console.log(url)

           fetch(url, {method: "GET",})
               .then(response => response.json())
               .then(item => {        
                    console.log(item)
                    this.addMessage(item)
               })
            this.setState({
                message: ""
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
        // var newMessage = item.message
        // go to #input
        var messages = this.state.messageList.slice(0)
        if (this.state.messageList.length > 0) {
            messages.push(item)
        } else {
            messages = [item]
        }
        this.setState({messageList: messages}, () => this.scrollDown())
    }

    scrollDown(){
        window.scrollTo(0, document.body.clientHeight)
    }

    render(){
        // refaire ce positionnement des elements
        const messageContainerStyle = {
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
                maxWidth: '300px',
                minHeight: window.innerHeight - 60
        }
        return(
            <div className="form">
                <div style={messageContainerStyle}>
                    {this.state.messageList.map((item, index) => <Message
                                                                    key={index}
                                                                    userName={item.userName}
                                                                    message={item.message}
                                                                    />
                                                    )
                        }
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