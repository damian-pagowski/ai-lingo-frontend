import React, { useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const ExerciseAudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio(audioUrl);

  const handlePlay = () => {
    if (!audioUrl) return;

    setIsPlaying(true);
    audio.play();

    audio.onended = () => setIsPlaying(false);
  };

  return (
    <div onClick={handlePlay} style={{ cursor: "pointer" }}>
      <PlayCircleOutlineIcon sx={{ fontSize: "50px" }} color={isPlaying ? "primary" : "inherit"} />
    </div>
  );
};

export default ExerciseAudioPlayer;