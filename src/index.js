import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Login from './Login';
// import Home from './Home';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<Login />, document.getElementById('login'));
// ReactDOM.render(<Home />, document.getElementById('home'));
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
