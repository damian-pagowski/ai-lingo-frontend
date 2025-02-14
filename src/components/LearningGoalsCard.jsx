import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, List, ListItem, ListItemText } from "@mui/material";

const LearningGoalsCard = ({ preferences, onEdit }) => {
  
  const formatTopic = (topic) => topic.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6">
          Learning Goals
        </Typography>
        <List>
          {preferences.map((topic, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    {formatTopic(topic)}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="outlined" sx={{ mb: 1, width: "100%" }} onClick={onEdit}>
          Set New Goals
        </Button>
      </CardActions>
    </Card>
  );
};

export default LearningGoalsCard;
