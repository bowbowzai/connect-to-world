import React, { useState, useEffect } from 'react';

const SignalingServerUrl = 'ws://localhost:8080';

const PeerConnection = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [isCaller, setIsCaller] = useState(false);
  const [signalingChannel, setSignalingChannel] = useState(null);
  const [offer, setOffer] = useState(null);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => setLocalStream(stream))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (localStream && !peerConnection) {
      const pc = new RTCPeerConnection();
      setPeerConnection(pc);
      pc.addStream(localStream);
    }
  }, [localStream]);

  useEffect(() => {
    if (peerConnection && !isCaller) {
      // Create a new WebSocket connection to the signaling server
      const channel = new WebSocket(SignalingServerUrl);
      setSignalingChannel(channel);

      // Handle incoming messages from the signaling server
      channel.onmessage = event => {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case 'offer':
            setOffer(message.offer);
            break;
          case 'answer':
            setAnswer(message.answer);
            break;
          case 'candidate':
            const candidate = new RTCIceCandidate(message.candidate);
            peerConnection.addIceCandidate(candidate);
            break;
        }
      };

      // Create an SDP offer and send it to the signaling server
      setIsCaller(true);
      peerConnection.createOffer()
        .then(offer => {
          setOffer(offer);
          return peerConnection.setLocalDescription(offer);
        })
        .then(() => {
          channel.send(JSON.stringify({ type: 'offer', offer: peerConnection.localDescription }));
        })
        .catch(error => console.log(error));
    }
  }, [peerConnection, isCaller]);

  useEffect(() => {
    if (peerConnection && answer) {
      const remoteDesc = new RTCSessionDescription(answer);
      peerConnection.setRemoteDescription(remoteDesc)
        .catch(error => console.log(error));
    }
  }, [peerConnection, answer]);

  useEffect(() => {
    if (peerConnection && offer) {
      peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => peerConnection.createAnswer())
        .then(answer => {
          setAnswer(answer);
          return peerConnection.setLocalDescription(answer);
        })
        .then(() => {
          signalingChannel.send(JSON.stringify({ type: 'answer', answer: peerConnection.localDescription }));
        })
        .catch(error => console.log(error));
    }
  }, [peerConnection, offer, signalingChannel]);

  const handleRemoteStream = event => {
    setRemoteStream(event.stream);
  };

  if (!localStream) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <video autoPlay ref={video => video.srcObject = localStream}></video>
      {remoteStream && <video autoPlay ref={video => video.srcObject = remoteStream}></video>}
    </div>
  );
};

export default PeerConnection;
