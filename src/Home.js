import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="App">
                <div className={"container"}>
                    <header className="App-header">
                        <div className={"jumbotron"} id="jumbo">
                            <div id="title">VoiNotes</div>
                        </div>
                    </header>
                    {/* <center><Link className={"login"} to="/login/">Login</Link></center> */}
                    <center><Link className={"login"} to={{ pathname: "/login", state: { valid: false }}}>Start</Link></center>
                </div>
            </div>
        );
    }
}

export default Home;
