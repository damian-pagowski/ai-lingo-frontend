import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

const PersonalInfoCard = ({ user, onEdit }) => {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ my: 1 }}>
          Personal Info
        </Typography>
        <Typography variant="body2">Name: {user.name}</Typography>
        <Typography variant="body2">Email: {user.email}</Typography>
        <Typography variant="body2">Learning Level: {user.level}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="outlined" sx={{ mb: 1, width: "100%" }} onClick={onEdit}>
          Edit Profile
        </Button>
      </CardActions>
    </Card>
  );
};

export default PersonalInfoCard;