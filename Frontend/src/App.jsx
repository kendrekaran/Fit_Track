import React from 'react'
import Register from './Register'
import SignIn from './SignIn'
import {  Route , Routes, useLocation } from 'react-router-dom'
import Home from './Home'
import Profile from './NavElments/Profile'
import BrowseExercise from './BrowseExercise'
import MuscleExercises from './Muscles/Muscles'
import { useState,useEffect } from 'react'
import Plans from './Plans'
import Classic from './Plans/Classic'
import PPL from './Plans/PPL'
import UL from './Plans/UL'
import Fullbody from './Plans/Fullbody'
import Power from './Plans/Power'
import Endurance from './Plans/Endurance'
import DietPlans from './DietPlans'
import { LoadingProvider } from './LoadingContext'

const App = () => {

  return (
    <div>
    <LoadingProvider>
      <Routes>
        <Route path="/" element={<Register/>} ></Route>
        <Route path="/register" element={<Register/>} ></Route>
        <Route path="/login" element={<SignIn/>} ></Route>
        <Route path="/home" element={<Home/>} ></Route>
        <Route path="/profile" element={<Profile/>} ></Route>
        <Route path="/muscle" element={<BrowseExercise/>} ></Route>
        <Route path="/diet" element={<DietPlans/>} ></Route>
        <Route path="/muscle/:muscle" element={<MuscleExercises/>} ></Route>
        <Route path="/plans" element={<Plans />} />
        <Route path="/plans/classic" element={<Classic />} />
        <Route path="/plans/ppl" element={<PPL />} />
        <Route path="/plans/upper-lower" element={<UL />} />
        <Route path="/plans/fullbody" element={<Fullbody />} />
        <Route path="/plans/power" element={<Power />} />
        <Route path="/plans/endurance" element={<Endurance />} />
      </Routes>
    </LoadingProvider>
    </div>
  )
}

export default App
