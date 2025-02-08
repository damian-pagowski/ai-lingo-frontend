import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowUpward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDownward";
import {voteExercise} from "../api/lessonApi"


const VoteWidget = ({ exerciseId, score }) => {
  const [votes, setVotes] = useState(score);
  const [userVote, setUserVote] = useState(null); 

  const handleVote = async (type) => {
    if (!exerciseId) {
      console.error("Exercise ID is missing!");
      return;
    }
  
    if (userVote) {
      console.warn("You have already voted on this exercise.");
      return; 
    }
  
    const voteType = type === "up" ? "upvote" : "downvote";
  
    try {
      const response = await voteExercise({ exerciseId, voteType });
  
      if (response && response.newScore !== undefined) {
        setVotes(response.newScore);
        setUserVote(type);
      }
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        bgcolor: (theme) => (theme.palette.mode === "dark" ? "grey.800" : "grey.400"),
        borderRadius: 10,
        px: 0,
        py: 0,
      }}
    >
      <IconButton
        onClick={() => handleVote("up")}
        color={userVote === "up" ? "primary" : "default"}
      >
        <ArrowDropUpIcon />
      </IconButton>

      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {votes}
      </Typography>

      <IconButton
        onClick={() => handleVote("down")}
        color={userVote === "down" ? "primary" : "default"}
      >
        <ArrowDropDownIcon />
      </IconButton>
    </Box>
  );
};

export default VoteWidget;