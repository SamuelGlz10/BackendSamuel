import { useState, useEffect } from 'react';
import './App.css';
import AppBody from './AppBody/AppBody'; 
import Footer from './Objects/Footer'; 

function App() {

  return (
    <div className="app">
      <AppBody />
      <Footer />
    </div>
  );
}

export default App;
