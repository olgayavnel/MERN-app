import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PandaDetail from './components/PandaDetail';
import PandaList from './components/PandaList';
import { NotFound } from './pages/NotFound';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PandaList />} />
        <Route path='/pandas/:id' element={<PandaDetail />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
