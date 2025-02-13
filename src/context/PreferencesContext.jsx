import { createContext, useState, useEffect, useContext } from "react";
import { getUserPreferences } from "../api/preferencesApi";

export const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshPreferences = async () => {
    setLoading(true);
    try {
      const data = await getUserPreferences();
      setPreferences(
        data?.preferences?.focus_areas ? JSON.parse(data.preferences.focus_areas) : []
      );
    } catch (err) {
      console.error("Error fetching preferences:", err);
      setError("Failed to load preferences.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPreferences();
  }, []);

  return (
    <PreferencesContext.Provider value={{ preferences, loading, error, refreshPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};


export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesContext');
  }
  return context;
};