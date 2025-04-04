import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              SwipeApp
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/swipe" 
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary"
            >
              Discover
            </Link>
            <Link 
              to="/matches" 
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary"
            >
              Matches
            </Link>
            {user ? (
              <button
                onClick={logout}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}