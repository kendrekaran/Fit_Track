import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, X, Menu } from 'lucide-react';

const NavBar = () => {
  const [profileImage, setProfileImage] = useState('https://i.imgur.com/XZwx7QS.jpeg');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedPicture = localStorage.getItem('profilePicture');
      if (savedPicture) {
        setProfileImage(savedPicture);
      }
    };

    const handleProfileUpdate = (e) => {
      setProfileImage(e.detail.picture);
    };

    handleStorageChange();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profilePictureUpdate', handleProfileUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profilePictureUpdate', handleProfileUpdate);
    };
  }, []);

  return (
    <div className='bg-white w-full h-16 flex items-center justify-between shadow-xl relative'>
      <Link to="/home" className="flex items-center gap-4 mb-6 px-4 sm:px-32 pt-4">
        <Dumbbell className="w-8 h-8" />
        <h1 className="font-bold text-3xl sm:text-4xl">FitTrack</h1>
      </Link>
      
      <div className='flex flex-row items-center justify-center'>
        <div className="px-4 hidden sm:flex space-x-4">
          <Link to="/home" className="text-xl font-xl text-black hover:text-gray-400 hover:scale-105 transition-colors p-2">
            Home
          </Link>
          <Link to="/muscle" className="text-xl font-xl text-black hover:text-gray-400 hover:scale-105 transition-colors p-2">
            Exercises
          </Link>
          <Link to="/plans" className="text-xl font-xl text-black hover:text-gray-400 hover:scale-105 transition-colors p-2">
            Plans
          </Link>
          <Link to="/diet" className="text-xl font-xl text-black hover:text-gray-400 hover:scale-105 transition-colors p-2">
            Diet
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden p-2 mr-2 text-black hover:text-gray-400"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <Link
          to="/profile"
          className="relative px-4 sm:px-10"
        >
          <motion.img
            className="h-10 w-10 rounded-full shadow-2xl object-cover"
            src={profileImage}
            alt="Profile"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </Link>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-16 left-0 right-0 bg-white shadow-lg sm:hidden z-50"
        >
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to="/home"
              onClick={() => setIsOpen(false)}
              className="text-xl text-black hover:text-gray-400 p-2"
            >
              Home
            </Link>
            <Link
              to="/muscle"
              onClick={() => setIsOpen(false)}
              className="text-xl text-black hover:text-gray-400 p-2"
            >
              Exercises
            </Link>
            <Link
              to="/plans"
              onClick={() => setIsOpen(false)}
              className="text-xl text-black hover:text-gray-400 p-2"
            >
              Plans
            </Link>
            <Link
              to="/diet"
              onClick={() => setIsOpen(false)}
              className="text-xl text-black hover:text-gray-400 p-2"
            >
              Diet
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NavBar;