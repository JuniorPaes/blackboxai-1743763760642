import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function MatchesPage() {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.getMatches();
        setMatches(res.data);
      } catch (err) {
        console.error('Error fetching matches:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Matches</h1>
      
      {matches.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You don't have any matches yet</p>
          <Link
            to="/swipe"
            className="px-4 py-2 bg-primary text-white rounded-lg inline-block"
          >
            Start Swiping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map(match => (
            <Link
              key={match._id}
              to={`/chat/${match._id}`}
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={match.users.find(u => u._id !== user._id).photo}
                  alt="Match profile"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {match.users.find(u => u._id !== user._id).name}
                </h3>
                <p className="text-gray-500">
                  Matched on {new Date(match.matchedAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}