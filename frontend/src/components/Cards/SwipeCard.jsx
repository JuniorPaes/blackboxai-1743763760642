import { motion } from 'framer-motion';

export default function SwipeCard({ user, onSwipeLeft, onSwipeRight, active }) {
  return (
    <motion.div
      className={`absolute w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden ${!active ? 'cursor-grab' : 'cursor-grabbing'}`}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => {
        if (info.offset.x > 100) onSwipeRight();
        else if (info.offset.x < -100) onSwipeLeft();
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ 
        scale: active ? 1 : 0.95,
        opacity: active ? 1 : 0.8
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <div className="relative h-full">
        <img 
          src={user.photo} 
          alt={user.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-end">
            <div className="flex-1">
              <h3 className="text-white text-2xl font-bold">{user.name}, {user.age}</h3>
              <p className="text-gray-200">{user.location}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={onSwipeLeft}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button 
                onClick={onSwipeRight}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}