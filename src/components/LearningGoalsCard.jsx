import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

const LearningGoalsCard = ({ preferences, onEdit }) => {
  
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ my: 1 }}>
          Learning Goals
        </Typography>
        <ul>
          {preferences.map((topic, index) => (
            <li key={index}>
              <Typography variant="body2">
                {topic.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </Typography>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="outlined" sx={{ mb: 1, width: "100%" }} onClick={onEdit}>
          Edit Preferences
        </Button>
      </CardActions>
    </Card>
  );
};

export default LearningGoalsCard;