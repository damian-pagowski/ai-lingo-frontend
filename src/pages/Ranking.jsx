import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import { getRanking } from "../api/progressApi";

const UserRankingScreen = () => {
  const [timeFrame, setTimeFrame] = useState(0);
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRank, setUserRank] = useState(null);

  const handleChange = (event, newValue) => {
    setTimeFrame(newValue);
  };

  useEffect(() => {
    console.log(timeFrame);
    console.log(JSON.stringify(rankingData));
  }, [timeFrame]);

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      try {
        const data = await getRanking();
        if (data) {
          setRankingData([
            data.dailyRanking,
            data.weeklyRanking,
            data.allTimeRanking,
          ]);
          setUserRank(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch ranking:", err);
        setError("Failed to load rankings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
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
