import { useEffect, useRef, useState } from 'react'
import './App.css'

const server = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
    }
  ],
  iceCandidatePoolSize: 10,
}

function App() {
  const [userName, setUsername] = useState("")
  const [callee, setCallee] = useState("")
  const [responseCallee, setResponseCallee] = useState("")
  const [login, setLogin] = useState(false)
  const [isBeingCalling, setIsBeingCalling] = useState(false)
  const [remoteSDP, setRemoteSDP] = useState({
    sdp: "",
    type: ""
  })
  const [isCurrentlyCalling, setIsCurrentlyCalling] = useState(false)
  const [socket, setSocket] = useState<WebSocket>()
  const [pc, setPc] = useState(() => new RTCPeerConnection(server))

  const webcamVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)

  let localStream: MediaStream | null = null
  let remoteStream: MediaStream | null = null

  async function handleCreateOffer() {

    pc.addEventListener("iceconnectionstatechange", (e) => {
      const iceConnectionState = pc.iceConnectionState
      if (iceConnectionState == "failed" || iceConnectionState == "disconnected" || iceConnectionState == "closed") {
        pc.close()
        remoteStream = null;
      }
    })
    pc.addEventListener("icecandidate", (e) => {
      if (e.candidate) {
        const data = {
          name: callee,
          iceCandidate: {
            label: e.candidate.sdpMLineIndex,
            id: e.candidate.sdpMid,
            candidate: e.candidate.candidate
          }
        }
        socket?.send(
          JSON.stringify({
            type: "ICEcandidate",
            data: data
          })
        )
      }
      const data = {
        "type": "call",
        "data": {
          sdp: pc.localDescription,
          name: callee
        }

      }
      // console.log(data);
      socket?.send(JSON.stringify(data))
    })
    const offerDescription = await pc.createOffer()
    await pc.setLocalDescription(offerDescription)
  }

  function handleLogin() {
    const socket = new WebSocket("ws://localhost:8000/ws/call/")
    setSocket(socket)
    setLogin(true)
    socket.addEventListener("open", (data => {
      socket.send(JSON.stringify({
        "type": "login",
        "data": {
          name: userName
        }
      }));
    }))

    socket.addEventListener("error", (data => {
      console.log("error");
    }))

    socket.addEventListener("message", (e => {
      const response = JSON.parse(e.data)
      if (response.type == "call_received") {
        console.log(response);
        setResponseCallee(response.data.caller)
        setIsBeingCalling(true)
        setRemoteSDP(response.data.sdp)
      }
      if (response.type == 'call_answered') {
        console.log(response.data);
        pc.setRemoteDescription(new RTCSessionDescription(response.data.sdp))
      }
      if (response.type == 'ICEcandidate') {
        console.log("ice candidate");
        console.log(response);
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: response.data.candidate.label,
          candidate: response.data.candidate.candidate,
        })
        if (pc && pc.remoteDescription) {
          pc.addIceCandidate(candidate)
        } else {

        }
      }
    }))
  }

  async function handleAnswer() {
    console.log("answer");
    pc.setRemoteDescription(new RTCSessionDescription(remoteSDP as RTCSessionDescriptionInit))
    pc.createAnswer((sessionDescription: any) => {
      pc.setLocalDescription(sessionDescription)
      socket?.send(JSON.stringify({
        "type": "answer_call",
        "data": {
          name: responseCallee,
          sdp: sessionDescription
        }
      }));
      setIsCurrentlyCalling(true)
    }, (error) => {
      console.log(error);
    })


  }

  async function handleStartWebacm() {
    localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
    if (webcamVideoRef.current) {
      (webcamVideoRef.current as HTMLVideoElement).srcObject = localStream;
      (webcamVideoRef.current as HTMLVideoElement).muted = true;
    }
    localStream!.getTracks().forEach(track => {
      pc.addTrack(track, localStream as MediaStream)
    })
    remoteStream = new MediaStream()
    if (remoteVideoRef.current) {
      (remoteVideoRef.current as HTMLVideoElement).srcObject = remoteStream
    }
    pc.ontrack = event => {
      event.streams[0].getTracks().forEach(track => {
        remoteStream?.addTrack(track);
      })
    };

  }

  return (
    <div className="App">
      {login ? <h2>{userName}</h2> : <div><h2>1. Login with username</h2>
        <input value={userName} onChange={(e) => setUsername(e.target.value)} type="text" />
        <input type="button" value="login" onClick={() => handleLogin()} /></div>}
      <h2>1. Start your Webcam</h2>
      <div className="videos">
        <span>
          <h3>Local Stream</h3>
          <video ref={webcamVideoRef} id="webcamVideo" autoPlay playsInline></video>
        </span>
        <span>
          <h3>Remote Stream ({responseCallee})</h3>
          <video ref={remoteVideoRef} id="remoteVideo" autoPlay playsInline></video>
        </span>

      </div>

      <button id="webcamButton" onClick={handleStartWebacm}>Start webcam</button>
      <h2>2. Create a new Call</h2>
      <input type="text" value={callee} onChange={(e) => setCallee(e.target.value)} />
      <button id="callButton" onClick={handleCreateOffer}>Create Call (offer)</button>

      {isCurrentlyCalling ? <p>You and {responseCallee} is currently calling</p> : isBeingCalling ? <div><h2>3. Answer a Call</h2>
        <p>{responseCallee} is calling you</p>
        <button onClick={handleAnswer} id="answerButton" >Answer</button></div> : null}

      <h2>4. Hangup</h2>
      <button id="hangupButton" >Hangup</button>
    </div>
  )
}

export default App
