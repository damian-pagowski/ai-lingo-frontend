import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/dashboard" className="text-lg font-bold">AI Lingo</Link>
      
      {/* Mobile Menu Button */}
      <button className="text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center z-50">
          <Link to="/dashboard" className="hover:text-gray-300 py-4 text-xl">Home</Link>
          <Link to="/lessons" className="hover:text-gray-300 py-4 text-xl">Lessons</Link>
          <Link to="/profile" className="hover:text-gray-300 py-4 text-xl">Profile</Link>
          <Link to="/settings" className="hover:text-gray-300 py-4 text-xl">Settings</Link>
          <button onClick={handleLogout} className="hover:text-gray-300 py-4 text-xl">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;