import './App.css'
import React from 'react';
import {Login} from "./pages/auth/Login.jsx";
import {Signup} from "./pages/auth/Signup.jsx";
import {Route, Routes} from "react-router-dom";
import {Dashboard} from "./pages/dashboard/Dashboard.jsx";
function App() {

  return (
    <div className="w-full App">
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
  )
}

export default App
