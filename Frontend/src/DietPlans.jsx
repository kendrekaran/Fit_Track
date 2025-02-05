import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, User, Weight, Ruler, Calendar, Target, Pocket, Book, ChevronRight } from 'lucide-react';
import NavBar from './NavBar';
import ReactMarkdown from "react-markdown";



const DietPlans = () => {
  const [inputs, setInputs] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    goal: 'maintain',
    activityLevel: 'moderate',
  });

  const [animatedDietPlan, setAnimatedDietPlan] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  useEffect(() => {
    if (result?.diet_plan) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < result.diet_plan.length) {
          setAnimatedDietPlan(prev => prev + result.diet_plan[i]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 20);

      return () => clearInterval(interval);
    }
  }, [result]);

  const calculateBMR = () => {
    const { weight, height, age, gender } = inputs;
    if (gender === 'male') {
      return 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5;
    } else {
      return 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161;
    }
  };

  const calculateTDEE = (bmr) => {
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };
    return Math.round(bmr * activityMultipliers[inputs.activityLevel]);
  };

  const calculateCalories = (tdee) => {
    const goalMultipliers = {
      lose: 0.8,
      maintain: 1,
      gain: 1.15,
    };
    return Math.round(tdee * goalMultipliers[inputs.goal]);
  };

  const calculateProtein = () => {
    const proteinMultipliers = {
      lose: 2.2,
      maintain: 1.8,
      gain: 2.0,
    };
    return Math.round(Number(inputs.weight) * proteinMultipliers[inputs.goal]);
  };

  const getDietPlan = async (calories, protein) => {
    const prompt = `Generate a concise yet effective diet plan based on the following daily requirements:

    Calories: ${calories} kcal
    Protein: ${protein}g
    Goal: ${inputs.goal} weight
    The plan should be structured with:
    1️⃣ Meal timings (breakfast, lunch, dinner, snacks)
    2️⃣ Recommended foods (categorized: proteins, carbs, fats)
    3️⃣ Foods to avoid
    4️⃣ Quick meal suggestions

    Format the response in bullet points. Keep it short and practical (under 150 words) to maximize efficiency while ensuring it looks cleans with enought spacing between each points.
    
    Don't use * symbol
    `;

    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Error getting diet plan:', error);
      return 'Unable to generate diet plan. Please try again later.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null); 
    setAnimatedDietPlan('');

    try {
      const bmr = calculateBMR();
      const tdee = calculateTDEE(bmr);
      const calories = calculateCalories(tdee);
      const protein = calculateProtein();
      const dietPlan = await getDietPlan(calories, protein);

      setResult({
        calories,
        protein_grams: protein,
        diet_plan: dietPlan,
      });
    } catch (error) {
      setError('Error calculating nutrition data. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Header */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Personalized Nutrition Calculator
            </h1>
          </motion.div>
          <p className="mt-2 text-lg text-gray-600">Get your customized diet plan based on your goals and lifestyle</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Weight Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Weight className="w-4 h-4 text-black" />
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={inputs.weight}
                    onChange={(e) => setInputs((prev) => ({ ...prev, weight: e.target.value }))}
                    className="w-64 h-8 p-1 px-4 rounded-lg border border-gray-400 shadow-sm focus:border-black focus:ring-black transition-all duration-200"
                    required
                  />
                </div>

                {/* Height Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Ruler className="w-4 h-4 text-black" />
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={inputs.height}
                    onChange={(e) => setInputs((prev) => ({ ...prev, height: e.target.value }))}
                    className="w-64 h-8 p-1 px-4 rounded-lg border shadow-sm focus:border-black focus:ring-black transition-all duration-200 border-gray-400"
                    required
                  />
                </div>

                {/* Age Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 text-black" />
                    Age
                  </label>
                  <input
                    type="number"
                    value={inputs.age}
                    onChange={(e) => setInputs((prev) => ({ ...prev, age: e.target.value }))}
                    className="w-64 h-8 p-1 px-4 rounded-lg border shadow-sm focus:border-black focus:ring-black transition-all duration-200 border-gray-400"
                    required
                  />
                </div>

                {/* Gender Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 text-black" />
                    Gender
                  </label>
                  <select
                    value={inputs.gender}
                    onChange={(e) => setInputs((prev) => ({ ...prev, gender: e.target.value }))}
                    className="w-64 h-8 p-1 px-4 rounded-lg border shadow-sm focus:border-black focus:ring-black transition-all duration-200 border-gray-400"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* Activity Level Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Activity className="w-4 h-4 text-black" />
                    Activity Level
                  </label>
                  <select
                    value={inputs.activityLevel}
                    onChange={(e) => setInputs((prev) => ({ ...prev, activityLevel: e.target.value }))}
                    className="w-64 h-8 p-1 px-4 rounded-lg border shadow-sm focus:border-black focus:ring-black transition-all duration-200 border-gray-400"
                    required
                  >
                    <option value="sedentary">Sedentary (Little/No Exercise)</option>
                    <option value="light">Light (1-3 days/week)</option>
                    <option value="moderate">Moderate (3-5 days/week)</option>
                    <option value="active">Active (6-7 days/week)</option>
                    <option value="veryActive">Very Active (Athletic/Physical Job)</option>
                  </select>
                </div>

                {/* Goal Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Target className="w-4 h-4 text-black" />
                    Goal
                  </label>
                  <select
                    value={inputs.goal}
                    onChange={(e) => setInputs((prev) => ({ ...prev, goal: e.target.value }))}
                    className="w-64 h-8 p-1 px-4 rounded-lg border shadow-sm focus:border-black focus:ring-black transition-all duration-200 border-gray-400"
                    required
                  >
                    <option value="lose">Lose Weight</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="gain">Gain Weight</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    px-8 py-3 rounded-lg bg-black text-white font-medium
                    transform transition-all duration-200
                    hover:bg-black hover:scale-105
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Calculating...</span>
                    </div>
                  ) : (
                    'Calculate Requirements'
                  )}
                </button>
              </div>
            </form>
          </div>

          <AnimatePresence mode='wait'>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border-t border-gray-200 bg-gray-50 p-8"
              >
                <div className="max-w-3xl mx-auto">
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Pocket className="w-5 h-5 text-black" />
                        <h3 className="text-lg font-semibold text-gray-900">Daily Calories</h3>
                      </div>
                      <p className="text-3xl font-bold text-black">{result.calories} kcal</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-black" />
                        <h3 className="text-lg font-semibold text-gray-900">Daily Protein</h3>
                      </div>
                      <p className="text-3xl font-bold text-black">{result.protein_grams}g</p>
                    </div>
                  </div>

                  {result && (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Your Personalized Diet Plan
                      </h3>
                      <ReactMarkdown>
                        {animatedDietPlan}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DietPlans;