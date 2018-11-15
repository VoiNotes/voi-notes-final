import React, { Component } from 'react';
import './Meeting.css';
import { ReactMic } from 'react-mic';
import { Redirect } from 'react-router';
import $ from 'jquery';

function LoginRedirect(props) {
    if (props.fromLogin === true) {
        console.log("red");
        return <Redirect to="/meeting" />
    } else {
        return <Redirect to="/" />
    }
}

class Meeting extends Component {

    constructor(props) {
        super(props);

        let fl, un, mt;
        try {
            fl = this.props.location.state.fromLogin;
            un = this.props.location.state.uname;
            mt = this.props.location.state.mtime;

            // this.props.location.state.fromLogin = false;
            // this.props.location.state.uname = "";

            // console.log(this.props.location.state.fromLogin);
        } catch (TypeError) {
            console.log("m error");
            fl = false;
            un = "";
            mt = "";
        }

        this.state = {
            fromLogin: fl,
            uname: un,
            mtime: mt,
            record: false
        }
    }

    componentDidMount = () => {
        // document.getElementById("startb").className = "btn btn-success disabled";
        // document.getElementById("stopb").className = "btn btn-danger disabled";
        document.getElementById("smail").className = "btn btn-primary disabled";
        setInterval(() => {
            var d = new Date();
            var ch = d.getHours();
            var cm = d.getMinutes();
            var cs = d.getSeconds();

            if (ch < 10) {
                ch = "0" + ch;
            }
            if (cm < 10) {
                cm = "0" + cm;
            }
            if (cs < 10) {
                cs = "0" + cs;
            }

            var curt = ch + ":" + cm + ":" + cs;
            var ct = ch + ":" + cm;
            // console.log(d.getSeconds());
            try {
                document.getElementById("time").innerHTML = curt;
            } catch (TypeError) {
                console.log("useless");
            }
            if (ct === this.state.mtime) {
                // document.getElementById("startb").onclick = this.startRecording;
                // document.getElementById("startb").className = "btn btn-success";
            }
        }, 1000);
        // console.log(typeof (curt));
        // console.log(curt);
        console.log(this.state.mtime);
        // console.log(curt === this.state.mtime);
    }

    sendMail = () => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var uid = document.getElementById("userid").value;
        var upas = document.getElementById("userpwd").value;
        console.log("id", uid, "pass", upas, re.test(uid));
        // var recipients = ["sharma.devansh@rediffmail.com", "devansh.sharma@gmail.com", "sharmadevansh82@yahoo.com"];
        console.log(uid !== "" && upas !== "" && re.test(uid));
        console.log(uid !== "");

        var u, p;
        u = true;
        p = true;

        if (uid === "" || re.test(uid) === false) {
            document.getElementById("userid").style.border = "2px solid red";
            document.getElementById("userid").style.backgroundColor = "rgb(221, 195, 195)";
            u = false;
        } else {
            document.getElementById("userid").style.border = "none";
            document.getElementById("userid").style.backgroundColor = "none";
            u = true;
        }
        
        if (upas === "") {
            document.getElementById("userpwd").style.border = "2px solid red";
            document.getElementById("userpwd").style.backgroundColor = "rgb(221, 195, 195)";
            p = false;
        } else {
            document.getElementById("userpwd").style.border = "0px solid white";
            document.getElementById("userpwd").style.backgroundColor = "rgb(255, 255, 255)";
            p = true;
        }

        if (u === true && p === true) {
            var recipients = document.getElementById("recs").value;
            recipients = recipients.split("\n");
            recipients.splice(-1, 1);
            var jrps = JSON.stringify(recipients);
            console.log(jrps);
            $.ajax({
                url: 'http://localhost:8888/VoiNotes/mailer.php',
                type: 'POST',
                data: {
                    'username': document.getElementById("userid").value,
                    'password': document.getElementById("userpwd").value,
                    'message': 'It is a working !!!',
                    'recipients': jrps
                },
                success: (data) => {
                    console.log(data);
                },
                error: function (xhr, status, err) {
                    console.log("Error reported by AJAX " + err);
                }
            });
        }
    }

    addRec = () => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (document.getElementById("recid").value !== "" && re.test(document.getElementById("recid").value) === true) {
            document.getElementById("recs").value += document.getElementById("recid").value + "\n";
            document.getElementById("recid").value = "";
            document.getElementById("smail").className = "btn btn-primary";
        }
    }

    startRecording = () => {
        document.getElementById("stopb").className = "btn btn-danger";
        document.getElementById("stopb").onclick = this.stopRecording;
        this.setState({
            record: true
        });
    }

    stopRecording = () => {
        this.setState({
            record: false
        });
    }

    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop(recordedBlob) {
    }
    render() {
        return (
            <div className={"meeting"}>
                <div className={""}>
                    <LoginRedirect fromLogin={this.state.fromLogin} uname={this.state.uname} />
                    <div className={"jumbotron text-left"} id="mjumbo">
                        <div id="greet">Welcome, {this.state.uname}</div>
                        <div id="time"></div>
                    </div>
                    <div id="clk"></div>
                    {/* <div className={"react-mic"}>
                        <ReactMic
                            record={this.state.record}
                            className="sound-wave"
                            onStop={this.onStop}
                            onData={this.onData}
                            strokeColor="#000000"
                            backgroundColor="#FF4081" />
                    </div>
                    <div className={"react-mic-control"}>
                        <button className={"btn btn-success"} type="button" id="startb">Start</button>
                        <button className={"btn btn-danger"} onClick={this.stopRecording} type="button" id="stopb">Stop</button>
                    </div> */}
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                    <div id="mailstuff">
                        <div className={"row"}>
                            <div className={"col-sm-8"}>
                                <input type="text" className={"form-control"} id="userid" required placeholder="Email ID"></input>
                                <input type="password" className={"form-control"} id="userpwd" required placeholder="Password"></input>
                            </div>
                            <div className={"col-sm-4"}>
                                <button type="button" className={"btn btn-primary"} id="smail" onClick={this.sendMail}>Send Mail</button>
                            </div>
                        </div>
                        <br></br>
                        <div className={"row"}>
                            <div className={"col-sm-8"}>
                                <input type="email" className={"form-control"} id="recid" placeholder="Recipient Email ID"></input>
                            </div>
                            <div className={"col-sm-4"}>
                                <button type="button" className={"btn btn-default"} id="addrec" onClick={this.addRec}>Add Recipient</button>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col-sm-12"}>
                                <textarea id="recs" rows={5} readOnly className={"form-control"}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Meeting;