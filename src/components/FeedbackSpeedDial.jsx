import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp'; 
import ThumbDownIcon from '@mui/icons-material/ThumbDown'; 
import { useState } from 'react';
import { voteExercise } from '../api/exerciseApi';

const actions = [
  { icon: <ThumbUpIcon />, name: 'Thumbs Up', voteType: 'upvote' }, 
  { icon: <ThumbDownIcon />, name: 'Thumbs Down', voteType: 'downvote' }, 
];

export default function FeedbackSpeedDial({ exerciseId }) {
  const [open, setOpen] = useState(false);

  const handleVote = async (voteType) => {
    try {
      await voteExercise({ exerciseId, voteType });
      console.log(`Voted ${voteType} for exercise ${exerciseId}`);
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Feedback SpeedDial"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<MoreHorizIcon />} 
        open={open}
        FabProps={{ onClick: () => setOpen(!open) }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleVote(action.voteType)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
