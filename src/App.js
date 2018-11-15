import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './Home.js'
import Login from './Login.js'
import Meeting from './Meeting.js'
// import Meeting2 from './Meeting2.js'
// import { Router } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/login/" component={Login} />
          <Route path="/meeting/" component={Meeting} />}
          {/* <Route path="/meeting2/" component={Meeting2} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
