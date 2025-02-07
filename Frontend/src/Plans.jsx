import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from './NavBar';
import { exercises } from './exercises.json';
import { Calendar, Users, Dumbbell, Timer, ChevronRight, Target, Trophy } from 'lucide-react';

const PlanCard = ({ plan, details, image, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    onClick={onClick}
    className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
  >
    <div className="aspect-w-16 aspect-h-9 relative">
      <img
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        src={image}
        alt={details.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
      
      <div className="absolute top-4 left-4">
        <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl">
          <Trophy className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="absolute top-4 right-4">
        <span className="bg-blue-500/20 backdrop-blur-sm text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
          {details.intensity} Intensity
        </span>
      </div>
    </div>

    <div className="relative p-6">
      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        {details.title}
      </h3>

      <p className="text-gray-600 mb-6">
        {details.description}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600">{details.days}</span>
        </div>
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600">{details.intensity}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600">{details.experience}</span>
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600">Targeted Focus</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-6 text-blue-500 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <span>View workout plan</span>
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  </motion.div>
);

const Plans = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  const planDetails = {
    classic: {
      image:"https://i.pinimg.com/474x/53/ec/b5/53ecb5dae265e12b423ed8cdbdb1de03.jpg",
      title: 'Classic Body Part Split',
      days: '5 Days per Week',
      description: 'Traditional bodybuilding split targeting each muscle group once per week',
      intensity: 'High',
      experience: 'Intermediate'
    },
    ppl: {
      image:'https://i.pinimg.com/474x/81/3a/a7/813aa7255685f11be23fd13de9ac84b2.jpg',
      title: 'Push, Pull, Legs',
      days: '6 Days per Week',
      description: 'Efficient split for maximum muscle growth and strength gains',
      intensity: 'High',
      experience: 'Advanced'
    },
    'upper-lower': {
      image:'https://i.pinimg.com/474x/45/40/c1/4540c1ae44d7ec684bac54292b99bdc5.jpg',
      title: 'Upper/Lower Split',
      days: '4 Days per Week',
      description: 'Balanced approach for building strength and muscle mass',
      intensity: 'Moderate',
      experience: 'Intermediate'
    },
    fullbody: {
      image:'https://i.pinimg.com/474x/d0/ca/72/d0ca72fac05f6b51c4e888ba0c154381.jpg',
      title: 'Full-Body Routine',
      days: '3 Days per Week',
      description: 'Perfect for beginners and those with limited time for exercise, this routine offers a simple yet effective way to stay active.',
      intensity: 'Moderate',
      experience: 'Beginner'
    },
    power: {
      image:'https://i.pinimg.com/736x/b2/15/63/b21563f95b6b34fce85bc843699038f5.jpg',
      title: 'Power & Hypertrophy Split',
      days: '5 Days per Week',
      description: 'Focus on building strength and increasing muscle size through a well-structured workout plan that incorporates progressive overload.',
      intensity: 'Very High',
      experience: 'Advanced'
    },
    endurance: {
      image:'https://i.pinimg.com/474x/cb/5d/ee/cb5deee7a729b262409de28df8392fa4.jpg',
      title: 'Endurance Training',
      days: '4 Days per Week',
      description: 'Improve stamina and functional fitness along with muscle tone and endurance. This plan is perfect for those looking to increase cardiovascular health.',
      intensity: 'Moderate',
      experience: 'All Levels'
    }
  };

  const handlePlanSelection = (plan) => {
    let selectedExercises = [];
  
    switch (plan) {
      case 'classic':
        selectedExercises = {
          day1: [...exercises.chest.slice(0, 4), ...exercises.arms.slice(5, 9)], // Chest & arms
          day2: [...exercises.back.slice(0, 4), ...exercises.arms.slice(0, 3)],  // Back & arms
          day3: [...exercises.legs.slice(0, 6)],                                  // Legs
          day4: [...exercises.shoulders.slice(0, 4), ...exercises.core.slice(0, 3)], // Shoulders & Core
          day5: [...exercises.arms.slice(0, 4), ...exercises.core.slice(0, 3)]    // Arms & Core
        };
        break;
  
      case 'ppl':
        selectedExercises = {
          day1: [...exercises.chest.slice(0, 4), ...exercises.shoulders.slice(0, 3), ...exercises.arms.slice(0, 3)], // Push
          day2: [...exercises.back.slice(0, 4), ...exercises.arms.slice(0, 3)],  // Pull
          day3: [...exercises.legs.slice(0, 6)],                                  // Legs
          day4: [...exercises.chest.slice(0, 4), ...exercises.shoulders.slice(0, 3), ...exercises.arms.slice(0, 3)], // Push
          day5: [...exercises.back.slice(0, 4), ...exercises.arms.slice(0, 3)],  // Pull
          day6: [...exercises.legs.slice(0, 6)],                                  // Legs
        };
        break;
  
      case 'upper-lower':
        selectedExercises = {
          day1: [...exercises.chest.slice(0, 3), ...exercises.back.slice(0, 3), ...exercises.shoulders.slice(0, 3)], 
          day2: [...exercises.legs.slice(0, 6)],
          day3: [...exercises.chest.slice(0, 3), ...exercises.back.slice(0, 3), ...exercises.shoulders.slice(0, 3)], 
          day4: [...exercises.legs.slice(0, 6)]
        };
        break;
  
      case 'fullbody':
        selectedExercises = {
          day1: [...exercises.chest.slice(0, 2), ...exercises.back.slice(0, 2), ...exercises.legs.slice(0, 2), ...exercises.shoulders.slice(0, 2), ...exercises.arms.slice(0, 2)],
          day2: [...exercises.chest.slice(0, 2), ...exercises.back.slice(0, 2), ...exercises.legs.slice(0, 2), ...exercises.shoulders.slice(0, 2), ...exercises.core.slice(0, 2)],
          day3: [...exercises.chest.slice(0, 2), ...exercises.back.slice(0, 2), ...exercises.legs.slice(0, 2), ...exercises.shoulders.slice(0, 2), ...exercises.arms.slice(0, 2)]
        };
        break;
  
      case 'power':
        selectedExercises = {
          day1: [...exercises.chest.slice(0, 3), ...exercises.arms.slice(0, 3)], 
          day2: [...exercises.back.slice(0, 3), ...exercises.arms.slice(0, 3)],  
          day3: [...exercises.legs.slice(0, 6)],                                  
          day4: [...exercises.shoulders.slice(0, 3), ...exercises.core.slice(0, 3)], 
          day5: [...exercises.arms.slice(0, 4), ...exercises.core.slice(0, 3)]   
        };
        break;
  
      case 'endurance':
        selectedExercises = {
          day1: [...exercises.chest.slice(0, 2), ...exercises.back.slice(0, 2), ...exercises.core.slice(0, 2)], 
          day2: [...exercises.legs.slice(0, 4), ...exercises.core.slice(0, 2)],   
          day3: [...exercises.shoulders.slice(0, 2), ...exercises.arms.slice(0, 2), ...exercises.core.slice(0, 2)], 
          day4: [...exercises.chest.slice(0, 2), ...exercises.back.slice(0, 2), ...exercises.core.slice(0, 2)]
        };
        break;
  
      default:
        selectedExercises = {};
    }

    console.log("Selected Exercises:", selectedExercises);

    navigate(`/plans/${plan}`, { state: { exercises: selectedExercises } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Choose Your 
              <span className="bg-gradient-to-br from-sky-600 to-blue-600 bg-clip-text text-transparent">
                {" "}
                Training Plan
              </span>
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a workout plan that matches your goals and experience level
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {Object.keys(planDetails).map((plan, index) => (
            <motion.div
              key={plan}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handlePlanSelection(plan)}
              className="group relative bg-white  rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  className="inset-0 w-96 h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  src={planDetails[plan].image}
                  alt={planDetails[plan].title}
                />
                <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              </div>

              <div className="relative p-6">
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  {planDetails[plan].title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm">
                  {planDetails[plan].description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">{planDetails[plan].days}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">{planDetails[plan].intensity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">{planDetails[plan].experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Strength Focus</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plans;