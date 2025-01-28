import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUserPreferences } from '../api/preferencesApi';

const UserSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    level: "",
    goals: [],
    areas: [],
  });

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData((prev) => ({ ...prev, [name]: [...prev[name], value] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: prev[name].filter((item) => item !== value),
      }));
    }
  };


  const handleSubmit = async () => {
    try {
      await saveUserPreferences({
        level: formData.level,
        goals: formData.goals,
        domains: formData.areas,
      });
      alert("Preferences saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving preferences:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        Step {step}: {step === 1 ? "General Knowledge" : "Learning Goals"}
      </h1>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            How much do you know already?
          </h2>
          {[
            "Nothing, just starting and have no contact with the language.",
            "I can understand TV shows or movies in the language.",
            "I can read texts and understand the general sense.",
            "I can have simple conversations.",
            "I am advanced but want to perfect my skills.",
          ].map((option) => (
            <label key={option} className="block">
              <input
                type="radio"
                name="level"
                value={option}
                checked={formData.level === option}
                onChange={handleChange}
                className="mr-2"
              />
              {option}
            </label>
          ))}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Why do you want to learn?
          </h2>
          {[
            "I want to study or work in a country where this language is spoken.",
            "I want to go there for a holiday.",
            "I want to learn new vocabulary.",
            "I want to improve grammar.",
            "I want to focus on conversations/dialogues.",
          ].map((goal) => (
            <label key={goal} className="block">
              <input
                type="checkbox"
                name="goals"
                value={goal}
                checked={formData.goals.includes(goal)}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              {goal}
            </label>
          ))}
          {formData.goals.includes("I want to learn new vocabulary.") && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Which areas? (Select one or more)
              </h3>
              {["Daily life", "Work", "Travel", "Social situations"].map(
                (area) => (
                  <label key={area} className="block">
                    <input
                      type="checkbox"
                      name="areas"
                      value={area}
                      checked={formData.areas.includes(area)}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    {area}
                  </label>
                )
              )}
            </div>
          )}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleBack}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSetup;