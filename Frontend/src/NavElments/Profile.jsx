import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../NavBar';
import { Settings, User, Activity, Calendar, Award, LogOut, Edit, Camera, X, Check } from 'lucide-react';

const avatarImages = [
  'https://i.pinimg.com/474x/9f/df/46/9fdf46c6e5b2465e340ede0da9ee431b.jpg',
  'https://i.pinimg.com/474x/a3/cc/fd/a3ccfd7885e6cff94ebbbe40fd9e1611.jpg',
  'https://i.pinimg.com/474x/aa/4b/e1/aa4be101f8877e149fec292df48386c6.jpg',
  'https://i.pinimg.com/474x/7b/1d/a5/7b1da57b92ec01450be38816f4a01da1.jpg',
  'https://i.pinimg.com/736x/ee/09/21/ee09218c417823a7c7dbb67c5d3efd1b.jpg',
  'https://i.pinimg.com/736x/5e/77/8e/5e778ebab678d1a829f5562f8a977bc4.jpg',
  'https://i.pinimg.com/474x/9e/ec/be/9eecbe985bc4caaab201a0859c80e4c5.jpg',
  'https://i.pinimg.com/474x/be/36/67/be366773fcf2247e40fe6f22ab509cf0.jpg',
  'https://i.pinimg.com/474x/cc/ef/e1/ccefe13166d611943acdaca183e2663c.jpg'
  ];

const ProfilePictureModal = ({ isOpen, onClose, onSelect, currentImage }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-xl p-6 max-w-lg w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Choose Profile Picture</h2>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {avatarImages.map((avatar, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(avatar)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 
                  ${currentImage === avatar ? 'border-blue-500' : 'border-transparent'}`}
              >
                <img
                  src={avatar}
                  alt={`Avatar option ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {currentImage === avatar && (
                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                    <div className="bg-white rounded-full p-1">
                      <Check className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const StatCard = ({ icon: Icon, title, value }) => (
  <motion.div
    className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4"
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="p-3 bg-gray-100 rounded-lg">
      <Icon className="w-6 h-6 text-gray-700" />
    </div>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </motion.div>
);

const Profile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(avatarImages[0]);
  const [userStats] = useState({
    workoutsCompleted: 48,
    streakDays: 7,
    achievements: 12,
    joinedDate: '2024'
  });

  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');

  

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate("/login");
  };

  const handlePictureSelect = (newPicture) => {
    setProfilePicture(newPicture);
    localStorage.setItem('profilePicture', newPicture);
    
    // Dispatch custom event to update Navbar immediately
    window.dispatchEvent(new CustomEvent('profilePictureUpdate', {
      detail: { picture: newPicture }
    }));
    
    setIsModalOpen(false);
  };

  useEffect(() => {
    document.title = `${userName}'s Profile`;
    // Load saved profile picture from localStorage
    const savedPicture = localStorage.getItem('profilePicture');
    if (savedPicture) {
      setProfilePicture(savedPicture);
    }
  }, [userName]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <ProfilePictureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handlePictureSelect}
        currentImage={profilePicture}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-2xl shadow-md p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative mx-auto w-40 h-40">
                <motion.img
                  className="w-40 h-40 rounded-full object-cover shadow-lg"
                  src={profilePicture}
                  alt="Profile"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
                <motion.button
                  className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsModalOpen(true)}
                >
                  <Camera className="w-5 h-5 text-gray-700" />
                </motion.button>
              </div>

              <div className="mt-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900">{userName}</h1>
                <p className="text-gray-500 mt-1">{userEmail}</p>
                <div className="mt-6 flex justify-center gap-4">
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                    whileHover={{ scale: 1.05 }}
                    onClick={handleLogOut}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats & Activity */}
          <div className="lg:col-span-2">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <StatCard 
                icon={Activity} 
                title="Workouts Completed" 
                value={userStats.workoutsCompleted}
              />
              <StatCard 
                icon={Calendar} 
                title="Current Streak" 
                value={`${userStats.streakDays} days`}
              />
              <StatCard 
                icon={Award} 
                title="Achievements" 
                value={userStats.achievements}
              />
              <StatCard 
                icon={User} 
                title="Member Since" 
                value={userStats.joinedDate}
              />
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    whileHover={{ x: 10 }}
                  >
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Activity className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <p className="font-medium">Completed Chest Workout</p>
                      <p className="text-sm text-gray-500">2 days ago</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;