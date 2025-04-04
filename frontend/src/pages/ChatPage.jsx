import { useState, useEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function ChatPage() {
  const { matchId } = useParams();
  const { user } = useAuth();
  const [match, setMatch] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const [matchRes, messagesRes] = await Promise.all([
          api.getMatchDetails(matchId),
          api.getMessages(matchId)
        ]);
        setMatch(matchRes.data);
        setMessages(messagesRes.data);
      } catch (err) {
        console.error('Error fetching chat data:', err);
      }
    };
    fetchMatchData();
  }, [matchId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await api.sendMessage(matchId, newMessage);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (!user) return <Navigate to="/login" />;
  if (!match) return <div className="flex justify-center p-8">Loading...</div>;

  const otherUser = match.users.find(u => u._id !== user._id);

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      <div className="border-b border-gray-200 p-4 flex items-center bg-white">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={otherUser.photo}
          alt={otherUser.name}
        />
        <h2 className="ml-3 text-lg font-medium">{otherUser.name}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message._id || message.sentAt}
            className={`flex ${message.sender._id === user._id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender._id === user._id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              <p>{message.content}</p>
              <p className={`text-xs mt-1 ${message.sender._id === user._id ? 'text-primary-100' : 'text-gray-500'}`}>
                {new Date(message.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-primary text-white rounded-full p-2 w-10 h-10 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}