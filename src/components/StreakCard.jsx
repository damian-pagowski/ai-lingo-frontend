import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, Box } from '@mui/material';

const StyledCard = styled(Card)({
  margin: '0 auto',
  textAlign: 'center',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)'
  }
});

const StreakValue = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.success.dark,
  margin: theme.spacing(1, 0)
}));

const StreakCard = ({ currentStreak, longestStreak }) => {
  const getMotivationMessage = () => {
    if (currentStreak === 0) return 'Start your learning journey!';
    if (currentStreak <= 3) return 'Keep going! 🔥';
    return 'Amazing streak! 🚀';
  };

  return (
    <StyledCard elevation={3}>
      <CardContent aria-labelledby="streak-heading">
        <Typography
          variant="h6"
          component="h2"
          id="streak-heading"
          gutterBottom
        >
          Learning Streak
        </Typography>
        
        <StreakValue variant="h4" component="div">
          {currentStreak} Day{currentStreak !== 1 && 's'}
        </StreakValue>

        <Typography variant="body1" color="text.secondary">
          {getMotivationMessage()}
        </Typography>

        <Box mt={2}>
          <Typography variant="body2" component="div">
            Longest Streak: {longestStreak} Days
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

StreakCard.propTypes = {
  currentStreak: PropTypes.number.isRequired,
  longestStreak: PropTypes.number.isRequired
};

export default StreakCard;