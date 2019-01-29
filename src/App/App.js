import React, { Component } from 'react';
import './App.css';
import Form from '../Form/Form';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user = null
    }
  }

  render() {
    return (
      <div className="app">
        <h2>
          Simple Chat Test
        </h2>
        <div className="app_list">
          <Form user={this.state.user} />
        </div>
      </div>
    );
  }
}

export default App;
