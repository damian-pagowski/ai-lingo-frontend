import MultipleChoice from "../components/exercises/MultipleChoice";
import FillInTheBlank from "../components/exercises/FillInTheBlank";
import MatchingPairs from "../components/exercises/MatchingPairs";
import WordArrangement from "../components/exercises/WordArrangement";
import { Box } from "@mui/material";

const ExercisesList = ({ data, handleResult }) => (
  <Box sx={{p:0, m:0}}>
    {JSON.stringify(data)}
    {/* {data.type == "multiple_choice" && <MultipleChoice data handleResult />}
    {data.type == "fill_in_the_blank" && <FillInTheBlank data handleResult />}
    {data.type == "word_arrangement" && <WordArrangement data handleResult />}
    {data.type == "match_pairs" && <MatchingPairs data handleResult />} */}
    </Box>
);

export default ExercisesList;
