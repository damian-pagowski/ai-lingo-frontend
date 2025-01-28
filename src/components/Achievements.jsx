import PropTypes from 'prop-types';

const Achievements = ({ completedLessons, totalLessons }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h2>
        <p className="text-gray-700">
          You&apos;ve completed {completedLessons} lessons! 🎉
        </p>
        <p className="text-gray-700">
          Next milestone: Complete {totalLessons} lessons to earn a badge.
        </p>
      </div>
    );

}
  Achievements.propTypes = {
    completedLessons: PropTypes.number.isRequired,
    totalLessons: PropTypes.number.isRequired,
  };
    
  export default Achievements;