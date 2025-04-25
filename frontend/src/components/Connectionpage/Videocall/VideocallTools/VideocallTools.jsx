import React, { useState ,useEffect, useContext} from 'react';
import { Context } from "../../../../context/context";
import './VideocallTools.css';

export const VideocallTools = () => {
  const {
    isMuted,
    setIsMuted,
    isCameraOff,
    setIsCameraOff,
    isSharingScreen,
    setIsSharingScreen,
    localStreamRef,
    pcRef
  } = useContext(Context);

  const toggleMute = () => {
    const audioTracks = localStreamRef.current?.getAudioTracks();
    if (audioTracks) {
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleCamera = () => {
    const videoTracks = localStreamRef.current?.getVideoTracks();
    if (videoTracks) {
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

  const toggleScreenShare = async () => {
    if (!isSharingScreen) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        
        const screenTrack = screenStream.getVideoTracks()[0];
        const sender = pcRef.current.getSenders().find(s => s.track.kind === 'video');
        await sender.replaceTrack(screenTrack);
        
        screenTrack.onended = () => toggleScreenShare();
        setIsSharingScreen(true);
      } catch (err) {
        console.error("Screen sharing failed:", err);
      }
    } else {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      const sender = pcRef.current.getSenders().find(s => s.track.kind === 'video');
      await sender.replaceTrack(videoTrack);
      setIsSharingScreen(false);
    }
  };

  const endCall = () => {
    if (pcRef.current) {
      pcRef.current.close();
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  };

  return (
    <div className="video-controls">
      <button 
        className={`control-btn ${isMuted ? 'active' : ''}`}
        onClick={toggleMute}
      >
        {isMuted ? '❌' : '🎤'}
      </button>
      
      <button 
        className={`control-btn ${isCameraOff ? 'active' : ''}`}
        onClick={toggleCamera}
      >
        {isCameraOff ? '❌' : '📹'}
      </button>
      
      <button 
        className={`control-btn ${isSharingScreen ? 'active' : ''}`}
        onClick={toggleScreenShare}
      >
        {isSharingScreen ? '❌' : '🖥️'}
      </button>
      
      <button 
        className="control-btn end-call"
        onClick={endCall}
      >
        📞
      </button>
    </div>
  );
};
