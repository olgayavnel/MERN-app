import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PandaDetail from './pages/PandaDetail';
import PandaList from './components/PandaList';
import { NotFound } from './pages/NotFound';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='mx-auto max-w-screen-lg p-4'>
        <Routes>
          <Route path='/' element={<PandaList />} />
          <Route path='/pandas/:id' element={<PandaDetail />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
