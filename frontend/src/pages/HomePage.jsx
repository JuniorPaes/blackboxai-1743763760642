import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Find Your Perfect Match
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Swipe, match, and connect with amazing people near you
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/swipe"
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-secondary md:py-4 md:text-lg md:px-10"
                >
                  Start Swiping
                </Link>
                <Link
                  to="/matches"
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white border-primary hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  View Matches
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-secondary md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white border-primary hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}