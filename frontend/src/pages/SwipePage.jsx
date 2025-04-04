import SwipeContainer from '../components/Cards/SwipeContainer';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';

export default function SwipePage() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto max-w-md">
        <div className="h-full relative">
          <SwipeContainer />
        </div>
      </div>
    </div>
  );
}