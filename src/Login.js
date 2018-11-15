import React, { Component } from 'react';
import $ from 'jquery';
import './Login.css';
import lock from './lock.svg';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

function MeetingRedirect(props) {
    if (props.valid === true) {
        return <Redirect to={{ pathname: "/meeting", state: { fromLogin: true, uname: props.uname, mtime: props.mtime } }} />
    } else {
        return <Redirect to="/login" />
    }
}

class Login extends Component {
    constructor(props) {
        super(props);

        let val;
        try {
            val = this.props.location.state.valid;
        } catch (TypeError) {
            console.log("error");
            val = false;
        }

        this.state = {
            valid: val,
            uname: "",
            mtime: ""
        }
        console.log(this.state)
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit = () => {
        $.ajax({
            url: 'http://localhost:8888/VoiNotes/db.php',
            type: 'POST',
            data: { 'uid': document.getElementById("usr").value },
            success: (data) => {
                data = data.split("\n");
                if (data[0] === document.getElementById("pas").value) {
                    console.log("perfect");
                    document.getElementById("success").innerHTML = "";
                    this.setState((state) => ({ valid: true, uname: data[1], mtime: document.getElementById("mt").value }));
                    // this.setState((state) => ({link: "/meeting"}));
                    // meetingRedirect = <Redirect to="/meeting" />
                    // this.setState((state) => ({meetingRedirect: <Redirect to="/meeting" />}));
                } else {
                    console.log("che");
                    document.getElementById("success").innerHTML = "Wrong credentials";
                    this.setState((state) => ({ valid: false }));
                    // this.setState((state) => ({link: "/login"}));
                    // this.setState((state) => ({meetingRedirect: <Redirect to="/login" />}));
                }
            },
            error: function (xhr, status, err) {
                console.log("Error reported by AJAX " + err);
            }
        });
        // if(this.state.valid) {
        //     meetingRedirect = <Redirect to="/meeting" />
        // } else {
        //     meetingRedirect = <Redirect to="#" />
        // }
    }

    render() {
        return (
            <div className={"container"}>
                <div className={"jumbotron"}>
                    <div className="Login">
                        <header className="Login">
                            <img src={lock} id="lock" alt="lock"></img>
                            <center>
                                <p> Login </p>
                                <input type="text" className={"form-control"} id="usr" name="user" placeholder="Username" />
                                <input type="password" className={"form-control"} id="pas" name="pass" placeholder="Password" /><br></br>
                                Meeting Time: <input type="time" className={"form-control"} id="mt" name="mtime" min="9:00" max="20:00" />
                                <div id="success" className={"text-danger"}></div><br></br>
                                <Link to="#" className={"btn btn-success"} onClick={this.handleSubmit}>Start</Link>
                                {/* <input type="submit" name="submit" value="Start" className="btn btn-success" /> */}
                                {/* <button className={"btn btn-success"} onClick={this.handleSubmit}>Start</button> */}
                                {/* {alert(this.state.link)} */}
                                {/* {alert(this.state.meetingRedirect)} */}
                                {/* {this.state.meetingRedirect} */}
                                <MeetingRedirect valid={this.state.valid} uname={this.state.uname} mtime={this.state.mtime} />
                            </center>
                        </header>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
