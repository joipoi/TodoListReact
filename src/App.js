import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateItem from './pages/CreateItem';
import HomePage from './pages/HomePage';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateItem />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
