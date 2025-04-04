import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL, {
  withCredentials: true,
  autoConnect: false
});

export const connectSocket = (token) => {
  socket.io.opts.extraHeaders = {
    Authorization: `Bearer ${token}`
  };
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const subscribeToMatches = (callback) => {
  socket.on('new_match', callback);
  return () => socket.off('new_match');
};

export const subscribeToMessages = (callback) => {
  socket.on('new_message', callback);
  return () => socket.off('new_message');
};

export default socket;