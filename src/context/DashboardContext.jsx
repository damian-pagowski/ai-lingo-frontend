import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as dashboardApi from '../api/dashboardApi';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshDashboard = async () => {
    setLoading(true);
    try {
      const dashboard = await dashboardApi.getDashboard();
      setUser(dashboard.user || {});
      setProgress(dashboard.progress || {});
      setError(null);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  const value = {
    user,
    progress,
    loading,
    error,
    refreshDashboard
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};