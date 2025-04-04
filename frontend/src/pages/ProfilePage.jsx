import { useState, useEffect } from 'react';
import { useAuth, useNavigate } from '../contexts/AuthContext';
import api from '../services/api';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    age: '',
    location: '',
    interests: [],
    photo: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
        age: user.age,
        location: user.location,
        interests: [...user.interests],
        photo: user.photo
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.updateProfile(profile);
      navigate('/');
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  if (!user) return <Navigate to="/login" />;
  if (loading) return <div className="flex justify-center p-8">Loading...</div>;

  const interests = [
    'Music', 'Sports', 'Movies', 'Travel', 'Food',
    'Reading', 'Gaming', 'Art', 'Technology', 'Fitness'
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            min="18"
            value={profile.age}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Interests</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {interests.map(interest => (
              <div key={interest} className="flex items-center">
                <input
                  type="checkbox"
                  id={`interest-${interest}`}
                  checked={profile.interests.includes(interest)}
                  onChange={() => handleInterestToggle(interest)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor={`interest-${interest}`} className="ml-2 text-sm text-gray-700">
                  {interest}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={logout}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Logout
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}