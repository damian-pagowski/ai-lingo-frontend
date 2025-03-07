import { useState } from "react";
import AudioRecorder from "../AudioRecorder";
import { speaking } from "../../api/exerciseApi";
import { Box, Typography, Paper } from "@mui/material";
import LoadingIndicator from "../LoadingIndicator";
import ErrorMessage from "../ErrorMessage";

const SpeakingExercise = ({
  data,
  setSelectedAnswer,
  isCorrect,
}) => {
  console.log(JSON.stringify(data));
  const [transcript, setTranscript] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const sendAudioToBackend = async (audioBlob) => {
    const file = new File([audioBlob], `exercise-${data.id}.mp3`, {
      type: "audio/mpeg",
    });

    const formData = new FormData();
    formData.append("audioFile", file);

    try {
      setLoading(true);
      const response = await speaking(formData, data.id);
      if (!response.ok) {
        throw new Error("Failed to transcribe audio");
      }
      const responseData = await response.json();
      setTranscript(responseData.transcript);
      setSelectedAnswer(responseData.result);
    } catch (error) {
      setError(error.message || "Failed to load dashboard data");
      console.error("Error sending audio:", error);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <Box sx={{ py: 3, mx: "auto", bgcolor: "background.default" }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
        <Paper
          sx={{ p: 2, borderRadius: 2, bgcolor: "grey.800", color: "white" }}
        >
          <Typography variant="body1">{data.question}</Typography>
        </Paper>
      </Box>
      <Box sx={{ my: 5 }}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <AudioRecorder onAudioRecorded={sendAudioToBackend} />
        )}
      </Box>

      {transcript != null && (
        <Paper
          sx={{
            my: 5,
            borderRadius: 2,
            border: "1px solid",
            borderColor:
              isCorrect != null
                ? isCorrect
                  ? "success.main"
                  : "error.main"
                : "primary.main",
          }}
        >
            <Typography sx={{ textAlign: "center", my: 5 }}>
              Transcription: {transcript}
            </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default SpeakingExercise;
