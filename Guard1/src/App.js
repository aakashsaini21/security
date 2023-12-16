import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dash from './Dash';
import HomePage from './components/HomePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<HomePage/>}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/Dash/*" element={<Dash />} />
      </Routes>
    </div>
  );
}

export default App;
