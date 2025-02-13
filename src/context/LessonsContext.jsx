import { createContext, useState, useEffect, useContext } from "react";
import { getLessons } from "../api/lessonApi";

export const LessonsContext = createContext();

export const LessonsProvider = ({ children }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshLessons = async () => {
    setLoading(true);
    try {
      const data = await getLessons();
      setLessons(data);
    } catch (_err) {
      setError("Failed to load lessons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshLessons();
  }, []);

  return (
    <LessonsContext.Provider value={{ lessons, loading, error, refreshLessons }}>
      {children}
    </LessonsContext.Provider>
  );
};

export const useLessons = () => {
  const context = useContext(LessonsContext);
  if (!context) {
    throw new Error("useLessons must be used within a LessonsContext");
  }
  return context;
};