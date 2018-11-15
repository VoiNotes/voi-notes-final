// import React, { Component } from 'react';

// function RecordScript () {
//     var player = document.getElementById('player');

//     var handleSuccess = function (stream) {
//         if(window.URL) {
//             player.src = window.URL.createObjectURL(stream);
//             console.log("window.URL exists...");
//         }
//         else {
//             player.src = stream;
//             console.log("window.URL doesn't exist....");
//         }
//     }

//     navigator.mediaDevices.getUserMedia({audio: true, video: false})
//         .then(handleSuccess);
// }

// class Meeting2 extends Component {
//     render() {
//         return (
//             <audio id="player" controls></audio>
//             // <RecordScript />
//         );
//     }
// }

// export default Meeting2;