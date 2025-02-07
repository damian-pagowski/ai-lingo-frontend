import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUserPreferences } from "../api/preferencesApi";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Card,
  CardContent,
} from "@mui/material";
import { createInitialLesson } from "../api/lessonApi";

const UserSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    level: "",
    goals: [],
    areas: [],
    daily_lesson_commitment: 1, 
  });

  const steps = [
    "General Knowledge",
    "Learning Goals",
    "Vocabulary Focus",
    "Daily Commitment",
  ];

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, level: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value),
    }));
  };

  const handleCommitmentChange = (event) => {
    setFormData({ ...formData, daily_lesson_commitment: Number(event.target.value) });
  };

  const handleSubmit = async () => {
    try {
      await saveUserPreferences({
        level: formData.level,
        goals: formData.goals,
        domains: formData.areas,
        daily_lesson_commitment: formData.daily_lesson_commitment,
      });

      await createInitialLesson();

      navigate("/lessons");
    } catch (error) {
      console.error("Error saving preferences or generating lesson:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Box sx={{  mx: "auto", mt: 4 }}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {steps[step]}
          </Typography>

          {/* Step 1 - Language Level */}
          {step === 0 && (
            <Box>
              <Typography variant="h6">How much do you know already?</Typography>
              <RadioGroup name="level" value={formData.level} onChange={handleChange}>
                {[
                  "Nothing, just starting and have no contact with the language.",
                  "I can understand TV shows or movies in the language.",
                  "I can read texts and understand the general sense.",
                  "I can have simple conversations.",
                  "I am advanced but want to perfect my skills.",
                ].map((option) => (
                  <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                ))}
              </RadioGroup>
            </Box>
          )}

          {/* Step 2 - Learning Goals */}
          {step === 1 && (
            <Box>
              <Typography variant="h6">Why do you want to learn?</Typography>
              <FormGroup>
                {[
                  "I want to study or work in a country where this language is spoken.",
                  "I want to go there for a holiday.",
                  "I want to improve grammar.",
                  "I want to focus on conversations/dialogues.",
                ].map((goal) => (
                  <FormControlLabel
                    key={goal}
                    control={
                      <Checkbox
                        name="goals"
                        value={goal}
                        checked={formData.goals.includes(goal)}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={goal}
                  />
                ))}
              </FormGroup>
            </Box>
          )}

          {/* Step 3 - Vocabulary Focus */}
          {step === 2 && (
            <Box>
              <Typography variant="h6">Which areas of vocabulary would you like to focus on?</Typography>
              <FormGroup>
                {["Daily life", "Work", "Travel", "Social situations"].map((area) => (
                  <FormControlLabel
                    key={area}
                    control={
                      <Checkbox
                        name="areas"
                        value={area}
                        checked={formData.areas.includes(area)}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={area}
                  />
                ))}
              </FormGroup>
            </Box>
          )}

          {/* Step 4 - Daily Commitment */}
          {step === 3 && (
            <Box>
              <Typography variant="h6">How many lessons per day do you want to complete?</Typography>
              <RadioGroup
                name="daily_lesson_commitment"
                value={formData.daily_lesson_commitment}
                onChange={handleCommitmentChange} 
              >
                {[1, 3, 5].map((num) => (
                  <FormControlLabel
                    key={num}
                    value={num}
                    control={<Radio />}
                    label={`${num} lesson${num > 1 ? "s" : ""} per day`}
                  />
                ))}
              </RadioGroup>
            </Box>
          )}

          {/* Navigation */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            {step > 0 && (
              <Button variant="outlined" onClick={handleBack}>
                Back
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={(step === 0 && !formData.level) || (step === 1 && formData.goals.length === 0)}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={formData.areas.length === 0}
              >
                Submit
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserSetup;