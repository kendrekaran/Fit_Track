import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, User, Camera, X, Check, Dumbbell, ChevronRight } from 'lucide-react';
import NavBar from '../NavBar';


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

const TrainingSplitCard = ({ title, exercises, color }) => (
  <motion.div
    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className={`p-4 ${color} text-white`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Dumbbell className="w-5 h-5" />
          <h3 className="font-semibold">{title}</h3>
        </div>
        <span className="text-sm opacity-75">{exercises.length} exercises</span>
      </div>
    </div>
    <div className="p-4">
      <ul className="space-y-2">
        {exercises.slice(0, 3).map((exercise, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-1 h-1 rounded-full bg-gray-400" />
            {exercise}
          </li>
        ))}
        {exercises.length > 3 && (
          <li className="flex items-center justify-between text-sm text-gray-500 pt-2">
            <span>+{exercises.length - 3} more exercises</span>
            <ChevronRight className="w-4 h-4" />
          </li>
        )}
      </ul>
    </div>
  </motion.div>
);

const Profile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(avatarImages[0]);

  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');

  // Sample training splits data
  const trainingSplits = [
    {
      title: "Push Day",
      exercises: [
        "Bench Press",
        "Overhead Press",
        "Tricep Extensions",
        "Lateral Raises",
        "Chest Flyes"
      ],
      color: "bg-blue-600"
    },
    {
      title: "Pull Day",
      exercises: [
        "Deadlifts",
        "Barbell Rows",
        "Pull-ups",
        "Bicep Curls",
        "Face Pulls"
      ],
      color: "bg-blue-600"
    },
    {
      title: "Leg Day",
      exercises: [
        "Squats",
        "Romanian Deadlifts",
        "Leg Press",
        "Calf Raises",
        "Leg Extensions"
      ],
      color: "bg-purple-600"
    },
    {
      title: "Core & Cardio",
      exercises: [
        "Planks",
        "Russian Twists",
        "Mountain Climbers",
        "HIIT Intervals",
        "Jump Rope"
      ],
      color: "bg-orange-600"
    }
  ];

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate("/login");
  };

  const handlePictureSelect = (newPicture) => {
    setProfilePicture(newPicture);
    localStorage.setItem('profilePicture', newPicture);
    window.dispatchEvent(new CustomEvent('profilePictureUpdate', {
      detail: { picture: newPicture }
    }));
    setIsModalOpen(false);
  };

  useEffect(() => {
    document.title = `${userName}'s Profile`;
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
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-md p-8">
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
                    <span>Logout</span>
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Training Splits */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Training Splits</h2>
              <p className="text-gray-600">Customize your workout routine with these training splits</p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {trainingSplits.map((split, index) => (
                <TrainingSplitCard
                  key={index}
                  title={split.title}
                  exercises={split.exercises}
                  color={split.color}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;