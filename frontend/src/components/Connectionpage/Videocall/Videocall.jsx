import React, { useEffect, useRef, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../context/context';
import { VideocallTools } from './VideocallTools/VideocallTools';
import './Videocall.css';

const VideoCall = () => {
  const { 
    user,
    localStreamRef,
    pcRef,
    socketRef
  } = useContext(Context);
  
  const [callStatus, setCallStatus] = useState('disconnected');
  const [remoteStream, setRemoteStream] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState(null);
  const [participants, setParticipants] = useState([]);
  
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roomId) return;

    const connectWebSocket = async () => {
      try {
        const token = localStorage.getItem('access_token') || user?.token;
        
        const ws = new WebSocket(
          `ws://localhost:8000/ws/videocall/${roomId}/?token=${token}`
        );
        socketRef.current = ws;

        ws.onopen = () => {
          console.log('WebSocket connected');
          setError(null);
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          handleWebSocketMessage(data);
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setError('Connection error. Please try again.');
        };

        ws.onclose = () => {
          console.log('WebSocket disconnected');
          if (callStatus !== 'disconnected') {
            handleCallEnd();
          }
        };

        return () => {
          if (ws.readyState === WebSocket.OPEN) ws.close();
        };
      } catch (err) {
        console.error('WebSocket connection failed:', err);
        setError('Failed to connect. Please refresh and try again.');
      }
    };

    connectWebSocket();
  }, [roomId]);

  const handleWebSocketMessage = (data) => {
    switch(data.type) {
      case 'offer':
        handleRemoteOffer(data.offer);
        break;
      case 'answer':
        handleRemoteAnswer(data.answer);
        break;
      case 'ice-candidate':
        addIceCandidate(data.candidate);
        break;
      case 'user_joined':
        setParticipants(data.users);
        break;
      case 'user_disconnected':
        setParticipants(prev => prev.filter(id => id !== data.user_id));
        break;
      default:
        console.warn('Unknown message type:', data.type);
    }
  };

  const setupPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
      ]
    });
    pcRef.current = pc;

    pc.ontrack = (event) => {
      if (!remoteVideoRef.current.srcObject) {
        remoteVideoRef.current.srcObject = event.streams[0];
        setRemoteStream(event.streams[0]);
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate && socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({
          type: 'ice-candidate',
          candidate: event.candidate
        }));
      }
    };

    pc.oniceconnectionstatechange = () => {
      if (pc.iceConnectionState === 'disconnected') {
        handleCallEnd();
      }
    };

    return pc;
  };

  const startLocalStream = async () => {
    try {
      const constraints = {
        video: { width: 1280, height: 720 },
        audio: true
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localVideoRef.current.srcObject = stream;
      localStreamRef.current = stream;
      
      if (pcRef.current) {
        stream.getTracks().forEach(track => {
          pcRef.current.addTrack(track, stream);
        });
      }
      
      return stream;
    } catch (err) {
      console.error("Failed to get local stream", err);
      setError('Could not access camera/microphone. Please check permissions.');
      throw err;
    }
  };

  const createRoom = async () => {
    try {
      const response = await axios.post('http://localhost:8000/videocall/api/create-room/', {
        title: `${user.username}'s Room`,
        type_of: 'IO' 
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      setRoomId(response.data.room_id);
      setCallStatus('waiting');
      return response.data.room_id;
    } catch (error) {
      console.error('Creating room failed:', error);
      setError(error.response?.data?.message || 'Failed to create room');
      throw error;
    }
  };

  const joinRoom = async (roomId) => {
    try {
      await axios.post(`http://localhost:8000/videocall/api/join-room/${roomId}/`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      setCallStatus('active');
    } catch (error) {
      console.error('Joining room failed:', error);
      setError(error.response?.data?.message || 'Failed to join room');
      throw error;
    }
  };

  const handleRoomAction = async (action) => {
    try {
      setError(null);
      await startLocalStream();
      setupPeerConnection();
      
      if (action === 'create') {
        await createRoom();
      } else {
        await joinRoom(roomId);
      }
    } catch (error) {
      handleCallEnd();
    }
  };

  const handleRemoteOffer = async (offer) => {
    try {
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);
      
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({
          type: 'answer',
          answer: answer
        }));
      }
      setCallStatus('active');
    } catch (error) {
      console.error("Error handling remote offer:", error);
      setError('Failed to establish connection');
      handleCallEnd();
    }
  };

  const handleRemoteAnswer = async (answer) => {
    try {
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error("Error handling remote answer:", error);
      setError('Failed to establish connection');
      handleCallEnd();
    }
  };

  const addIceCandidate = (candidate) => {
    try {
      pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error("Error adding ICE candidate:", error);
    }
  };

  const handleCallEnd = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    
    setCallStatus('disconnected');
    setRemoteStream(null);
    setRoomId('');
    setParticipants([]);
  };

  useEffect(() => {
    return () => {
      handleCallEnd();
    };
  }, []);

  return (
    <div className="video-call">
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      
      <div className="video-container">
        <video 
          ref={localVideoRef} 
          autoPlay 
          muted 
          playsInline
          className="local-video"
        />
        <video 
          ref={remoteVideoRef} 
          autoPlay 
          playsInline
          className="remote-video"
        />
      </div>

      <div className="participants-list">
        {participants.length > 0 && (
          <div>
            <h3>Participants ({participants.length})</h3>
            <ul>
              {participants.map(id => (
                <li key={id}>{id === user.id ? 'You' : `User ${id}`}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="call-controls">
        <VideocallTools 
          onStartCall={() => handleRoomAction('create')}
          onJoinCall={() => handleRoomAction('join')}
          roomId={roomId}
          onRoomIdChange={(e) => setRoomId(e.target.value)}
          callStatus={callStatus}
          onEndCall={handleCallEnd}
        />
      </div>
    </div>
  );
};

export default VideoCall;