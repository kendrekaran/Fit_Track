import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import FeatureCards from './FeaturedCards';
import { motion } from "framer-motion";
import { Dumbbell, List, ClipboardCheck, Utensils, Bot, MoveRight } from "lucide-react";


const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const FeatureCard = ({ Icon, title, description, link }) => (
    <motion.div
      className='w-full max-w-[300px] sm:max-w-[360px] h-auto bg-white rounded-3xl p-6 sm:p-8 
        shadow-lg hover:shadow-2xl
        transition-all duration-300 transform hover:-translate-y-1 mx-2'
      whileHover={{ scale:  1.02 }}
    >
      <div className="flex flex-col h-full gap-4 sm:gap-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 rounded-2xl p-2 sm:p-3 flex items-center justify-center">
          <Icon size={36} className="text-gray-800" />
        </div>
  
        <div className="flex-grow">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            
            <h2 className='text-xl sm:text-2xl font-bold '>{title}</h2>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{description}</p>
        </div>
  
          <Link 
            to={link} 
            className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base"
          >
            Get Started
          </Link>
       
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />

          <div className="relative z-10 container mx-auto px-6 sm:px-16 lg:px-32 h-full md:h-[90vh] flex items-center">
            <div className="px-8 py-8 flex flex-col lg:flex-row-reverse justify-center gap-4 sm:gap-12 items-center w-full ">
              <motion.div
                className="relative w-full lg:w-1/2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="absolute inset-0  bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-[2rem] blur-3xl" />
                <img
                  src="https://i.imgur.com/NeL0K4N.png"
                  alt="Fitness"
                  className="relative w-60 md:w-full max-w-xl pt-4 md:pt-0 mx-auto object-contain drop-shadow-2xl"
                />
              </motion.div>


              <motion.div
                className="space-y-8 w-full lg:w-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="space-y-2 sm:space-y-8">
                  <motion.div
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-600 border border-gray-100 shadow-sm "
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Dumbbell className="sm:w-4 sm:h-4" />
                    <span className='text-xs'>Your Fitness Journey Starts Here</span>
                  </motion.div>

                  <h1 className="text-3xl sm:text-5xl md:text-7xl text-center sm:text-start font-bold leading-tight">
                    <span className="bg-gradient-to-br from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                      Your 
                      <span className="bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {" "}
                      Personal
                    </span>
                      <br />
                      Guide To
                    </span>
                    <span className="bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {" "}
                      Fitness
                    </span>
                  </h1>

                  <p className="text-xs text-center sm:text-start sm:text-base text-gray-600 max-w-xl leading-tight ">
                  Explore customized exercises for your fitness level. Track progress, stay motivated, and build a stronger, healthier you.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 px-8 sm:px-0">
                  <Link
                    to="/muscle"
                    className="group inline-flex items-center justify-center gap-2 px-2 py-2 sm:px-6 sm:py-3 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl font-semibold hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Start Training
                    <MoveRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>

                  <Link
                    to="/diet"
                    className="group inline-flex items-center justify-center gap-2 px-2 py-2 sm:px-6 sm:py-3 bg-white border border-gray-200 text-gray-900 rounded-2xl font-semibold hover:border-gray-300 hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02]"
                  >
                    Generate Diet
                    <Bot className="group-hover:rotate-12 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>




      {/* Features Section */}
      <section className="py-24 px-6 h-full sm:h-screen  sm:px-16 lg:px-32 bg-white">
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Explore Our Features
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
          <FeatureCard
            Icon={Dumbbell}
            title="Browse Exercises"
            description="Discover exercises tailored to all fitness levels and muscle groups. Perfect for beginners to pros."
            link="/muscle"
          />
          <FeatureCard
            Icon={List}
            title="Workout Plans"
            description="Choose from expertly designed workout plans to achieve your fitness goals, whether building strength or endurance."
            link="/plans"
          />
          <FeatureCard
            Icon={Utensils}
            title="Diet Plans"
            description="Get your personalised diet plans to complement your workout routine and achieve your fitness goals."
            link="/diet"
          />
        </div>

      </section>

      {/* Results Section */}
      <section className="py-24 px-6 sm:px-16 lg:px-32">
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Train Hard. Track Results.
            <br />
            Transform Your Fitness Journey.
          </h2>
        </motion.div>
        <FeatureCards />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6 sm:px-16 lg:px-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <i className="fi fi-ss-gym text-white" />
                <h1 className="font-bold text-3xl">FitTrack</h1>
              </div>
              <p className="text-gray-400">Created by Karan Kendre</p>
            </div>
            
            {['Socials', 'Support', 'Company'].map((title) => (
              <div key={title}>
                <h2 className="font-bold text-lg mb-4">{title}</h2>
                <ul className="space-y-2">
                  {['Instagram', 'LinkedIn', 'Twitter'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            © 2024 FitTrack. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;