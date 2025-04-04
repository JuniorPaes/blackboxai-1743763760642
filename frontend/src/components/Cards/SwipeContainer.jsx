import { useState, useEffect } from 'react';
import axios from 'axios';
import SwipeCard from './SwipeCard';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SwipeContainer() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [match, setMatch] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users', {
          params: {
            distance: 50,
            interests: user.interests
          }
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, [user]);

  const handleSwipe = async (direction) => {
    try {
      const swipedUserId = users[currentIndex]._id;
      const res = await axios.post('/api/swipes', {
        userId: swipedUserId,
        direction
      });

      if (res.data.match) {
        setMatch({
          id: res.data.matchId,
          user: users[currentIndex]
        });
      }

      setCurrentIndex(prev => prev + 1);
    } catch (err) {
      console.error('Error processing swipe:', err);
    }
  };

  const handleMatchClose = () => {
    setMatch(null);
    if (currentIndex >= users.length - 1) {
      navigate('/matches');
    }
  };

  if (users.length === 0 || currentIndex >= users.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500 text-lg">No more profiles to show</p>
        <button 
          onClick={() => navigate('/matches')}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
        >
          View your matches
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {users.slice(currentIndex, currentIndex + 3).map((user, index) => (
        <SwipeCard
          key={user._id}
          user={user}
          onSwipeLeft={() => handleSwipe('left')}
          onSwipeRight={() => handleSwipe('right')}
          active={index === 0}
        />
      ))}

      {match && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center">
            <h3 className="text-2xl font-bold text-primary">It's a match!</h3>
            <p className="mt-2">You and {match.user.name} liked each other</p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={handleMatchClose}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                Keep swiping
              </button>
              <button
                onClick={() => navigate(`/chat/${match.id}`)}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                Send message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}