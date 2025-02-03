import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NextStep = ({ lessonId }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => navigate(`/lessons/${lessonId}`)}
    >
      Start Another Lesson
    </Button>
  );
};

NextStep.propTypes = {
  lessonId: PropTypes.number.isRequired,
};

export default NextStep;
