import './App.css'
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './domain/HomePage';
import ServicePage from './domain/ServicePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DesignPage from './domain/DesignPage';
import GifPage from './domain/GifPage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <>
      <BrowserRouter>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
        <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode}/>} />
          <Route path="/services" element={<ServicePage isDarkMode={isDarkMode} />}/>
          <Route path="/gif" element={<GifPage/>}/>
          <Route path="/services/design" element={<DesignPage/>}/>
        </Routes>
      <Footer isDarkMode={isDarkMode}/>
      </BrowserRouter>
    </>
  )
}

export default App