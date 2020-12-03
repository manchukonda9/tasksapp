import React, { Component } from 'react';
import DashBoard from './components/DashBoard';


class App extends Component {
  render() {
    return (
        <div  className="container">
          <div className="teal white-text flow-text">Todo-App</div>
          <DashBoard />
        </div>
    );
  }
}

export default App;
