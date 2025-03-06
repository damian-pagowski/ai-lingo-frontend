import { useState } from "react";
import AudioRecorder from "../AudioRecorder";
import { speaking } from "../../api/exerciseApi";
import { Button, Box, Typography } from "@mui/material";

const SpeakingExercise = ({ data }) => {
  console.log(JSON.stringify(data));
  const [transcript, setTranscript] = useState(null);

  const sendAudioToBackend = async (audioBlob) => {
    const file = new File([audioBlob], `exercise-${data.id}.mp3`, { type: "audio/mpeg" });

    const formData = new FormData();
    formData.append("audioFile", file);

    try {
      const response = await speaking(formData, data.id)
      if (!response.ok) {
        throw new Error("Failed to transcribe audio");
      }

      const responseData = await response.json();
      setTranscript(responseData.transcript);
    } catch (error) {
      console.error("Error sending audio:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h5">{data.question}</Typography>
      <Typography>Speak Your Answer:</Typography>
      <AudioRecorder onAudioRecorded={sendAudioToBackend} />
      {transcript && <Typography>Transcription: {transcript}</Typography>}
      </Box>
  );
};

export default SpeakingExercise;