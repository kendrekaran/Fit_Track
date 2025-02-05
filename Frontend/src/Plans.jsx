import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import {exercises} from './exercises.json';

const Plans = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Function to handle plan selection and pass exercises
  const handlePlanSelection = (plan) => {
    let selectedExercises = [];

    switch (plan) {
      case 'classic':
        selectedExercises = [
          ...exercises.chest.slice(0, 3),
          ...exercises.back.slice(0, 3),
          ...exercises.legs.slice(0, 3),
          ...exercises.shoulders.slice(0, 3),
          ...exercises.arms.slice(0, 3)
        ];
        break;
      case 'ppl':
        selectedExercises = [
          ...exercises.chest.slice(0, 4),
          ...exercises.back.slice(0, 4),
          ...exercises.legs.slice(0, 4)
        ];
        break;
      case 'upper-lower':
        selectedExercises = [
          ...exercises.chest.slice(0, 3),
          ...exercises.back.slice(0, 3),
          ...exercises.shoulders.slice(0, 3),
          ...exercises.legs.slice(0, 4)
        ];
        break;
      case 'fullbody':
        selectedExercises = [
          ...exercises.chest.slice(0, 2),
          ...exercises.back.slice(0, 2),
          ...exercises.legs.slice(0, 2),
          ...exercises.shoulders.slice(0, 2),
          ...exercises.arms.slice(0, 2)
        ];
        break;
      case 'power':
        selectedExercises = [
          ...exercises.chest.slice(0, 3),
          ...exercises.back.slice(0, 3),
          ...exercises.legs.slice(0, 3),
          ...exercises.shoulders.slice(0, 3)
        ];
        break;
      case 'endurance':
        selectedExercises = [
          ...exercises.chest.slice(0, 2),
          ...exercises.back.slice(0, 2),
          ...exercises.legs.slice(0, 2),
          ...exercises.core.slice(0, 2)
        ];
        break;
      default:
        selectedExercises = [];
    }

    // Navigate to the plan page with selected exercises
    navigate(`/plans/${plan}`, { state: { exercises: selectedExercises } });
  };

  return (
    <div>
      <NavBar />

      <div className='flex flex-col items-center justify-center bg-gradient-to-t from-gray-700 via-gray-600 to-gray-400 bg-clip-text text-transparent font-extrabold text-4xl md:text-5xl pt-10'>
        <h2 className='flex justify-start items-start'>Choose a Plan</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 py-4 md:px-20 md:py-10">
        {['classic', 'ppl', 'upper-lower', 'fullbody', 'power', 'endurance'].map((plan) => (
          <div
            key={plan}
            onClick={() => handlePlanSelection(plan)}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto transform transition duration-500 hover:scale-105 hover:shadow-3xl cursor-pointer"
          >
            <img
              className="h-40 w-64 md:w-full object-cover md:h-60 filter grayscale"
              src={`https://i.pinimg.com/474x/e6/83/c8/e683c8e4c2f66c1a0c316c9f968b5b9c.jpg`} 
              alt={plan}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-100 transition-opacity duration-300 rounded-lg flex flex-col items-start justify-end p-4">
              <p className="text-white text-sm md:text-2xl font-bold">
                {plan === 'classic' && 'Classic Body Part Split'}
                {plan === 'ppl' && 'Push, Pull, Legs'}
                {plan === 'upper-lower' && 'Upper/Lower Split'}
                {plan === 'fullbody' && 'Full-Body Routine'}
                {plan === 'power' && 'Power & Hypertrophy Split'}
                {plan === 'endurance' && 'Endurance & Functional Training'}
              </p>
              <p className='text-gray-200'>
                {plan === 'classic' && '5 Days per Week'}
                {plan === 'ppl' && '6 Days per Week'}
                {plan === 'upper-lower' && '4 Days per Week'}
                {plan === 'fullbody' && '3 Days per Week'}
                {plan === 'power' && '5 Days per Week'}
                {plan === 'endurance' && '4 Days per Week'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;