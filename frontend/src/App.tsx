import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PandaDetail from './components/PandaDetail';
import PandaList from './components/PandaList';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<PandaList />} />
          <Route path='/pandas/:id' element={<PandaDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
