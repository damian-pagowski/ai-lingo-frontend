import { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useRanking } from "../context/RankingContext";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";

const UserRankingScreen = () => {
  const [timeFrame, setTimeFrame] = useState(0);
  const { rankingData, userRank, loading, error } = useRanking();

  const handleChange = (event, newValue) => {
    setTimeFrame(newValue);
  };
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary", p: 2 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        User Ranking
      </Typography>

      <Tabs
        value={timeFrame}
        onChange={handleChange}
        aria-label="user ranking tabs"
        centered
      >
        <Tab label="Today" />
        <Tab label="This Week" />
        <Tab label="All Time" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {rankingData[timeFrame]?.length === 0 ? (
          <Typography textAlign="center" sx={{ color: "text.secondary" }}>
            No ranking data available.
          </Typography>
        ) : (
          <List>
            {rankingData[timeFrame]?.map((user, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>{user.place}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={`Score: ${user.score}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {userRank && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h6">Your Rank</Typography>
          <Typography variant="body1">
            {userRank.rank !== "Unranked"
              ? `You are ranked #${userRank.rank} with ${userRank.score} points.`
              : "You are not ranked yet. Start completing lessons!"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UserRankingScreen;
