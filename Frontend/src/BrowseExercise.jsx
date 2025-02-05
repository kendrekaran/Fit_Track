import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const MuscleCard = ({ to, imageSrc, title }) => (
  <Link 
    to={to} 
    className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-102 hover:shadow-2xl"
  >
    <div className="aspect-w-16 aspect-h-9 md:aspect-h-12">
      <img
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        src={imageSrc}
        alt={`${title} Exercises`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
    </div>
    <div className="absolute bottom-0 w-full p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-xl md:text-3xl font-bold tracking-wide">{title}</h3>
        <span className="text-white opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          →
        </span>
      </div>
      <p className="text-gray-300 text-sm md:text-base mt-2 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        Explore {title.toLowerCase()} exercises →
      </p>
    </div>
  </Link>
);

const BrowseExercise = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const muscles = [
    {
      id: 'chest',
      title: 'Chest',
      image: 'https://i.pinimg.com/474x/a4/a2/2a/a4a22a7d2a08860592efafe577fbddcf.jpg'
    },
    {
      id: 'back',
      title: 'Back',
      image: 'https://i.imgur.com/SljJebL.jpeg'
    },
    {
      id: 'shoulders',
      title: 'Shoulders',
      image: 'https://i.pinimg.com/474x/d6/b8/d5/d6b8d58d541d297c59fe308b562e325f.jpg'
    },
    {
      id: 'arms',
      title: 'Arms',
      image: 'https://i.pinimg.com/474x/25/0d/73/250d73553191f19cce6ee0d303754d81.jpg'
    },
    {
      id: 'core',
      title: 'Core',
      image: 'https://i.pinimg.com/474x/25/5a/3f/255a3faf3356e121af41c26fdc6bb4a4.jpg'
    },
    {
      id: 'legs',
      title: 'Legs',
      image: 'https://i.imgur.com/Hq78WpX.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent">
            Choose Your Focus Area
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Select a muscle group to explore targeted exercises
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {muscles.map((muscle) => (
            <MuscleCard
              key={muscle.id}
              to={`/muscle/${muscle.id}`}
              imageSrc={muscle.image}
              title={muscle.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseExercise;