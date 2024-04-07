import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';
import Edit from './pages/Edit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:name" element={<Edit />} />
      </Routes>
    </Router>
  );
};

export default App;
