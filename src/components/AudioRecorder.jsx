import { useState, useRef } from "react";
import { IconButton, Box, Typography, Paper } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';


const AudioRecorder = ({ onAudioRecorded }) => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
        setAudioBlob(audioBlob);
        audioChunksRef.current = [];
        onAudioRecorded(audioBlob);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const playAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px",
    }}
  >
    <IconButton
      onClick={recording ? stopRecording : startRecording}
      sx={{
        width: "100px",
        height: "100px",
        backgroundColor: recording ? "red" : "primary.main",
        color: "white",
        "&:hover": {
          backgroundColor: recording ? "darkred" : "primary.dark",
        },
      }}
    >
      <MicIcon sx={{ fontSize: 50 }} />
    </IconButton>
  </Box>
  );
};

export default AudioRecorder;