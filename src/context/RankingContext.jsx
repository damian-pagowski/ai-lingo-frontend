import { createContext, useState, useEffect, useContext } from "react";
import { getRanking } from "../api/progressApi";

export const RankingContext = createContext();

export const RankingProvider = ({ children }) => {
  const [rankingData, setRankingData] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshRanking = async () => {
    setLoading(true);
    try {
      const data = await getRanking();
      if (data) {
        setRankingData([
          data.dailyRanking,
          data.weeklyRanking,
          data.allTimeRanking,
        ]);
        setUserRank(data.user);
      }
      setError(null);

    } catch (err) {
      console.error("Failed to fetch ranking:", err);
      setError("Failed to load rankings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshRanking();
  }, []);

  return (
    <RankingContext.Provider
      value={{ rankingData, userRank, loading, error, refreshRanking }}
    >
      {children}
    </RankingContext.Provider>
  );
};

export const useRanking = () => {
  const context = useContext(RankingContext);
  if (!context) {
    throw new Error("useRanking must be used within a RankingContext");
  }
  return context;
};
