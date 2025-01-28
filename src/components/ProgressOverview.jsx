import React from 'react';
import PropTypes from 'prop-types';

const ProgressOverview = ({ completedLessons, totalLessons, streak }) => {
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Progress</h2>
      <p className="text-gray-700">
        Lessons Completed: {completedLessons}/{totalLessons}
      </p>
      <div className="relative w-full bg-gray-300 rounded-full h-3 mt-2">
        <div
          className="bg-blue-500 h-3 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="mt-4 text-gray-700">🔥 Streak: {streak} days</p>
    </div>
  );
};
ProgressOverview.propTypes = {
  completedLessons: PropTypes.number.isRequired,
  totalLessons: PropTypes.number.isRequired,
  streak: PropTypes.number.isRequired,
};

export default ProgressOverview;
