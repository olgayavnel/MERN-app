import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PandaDetail from './pages/PandaDetail';
import PandaDashboard from './components/PandaDashboard';
import { NotFound } from './pages/NotFound';
import PandaEdit from './pages/PandaEdit';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='mx-auto max-w-screen-lg p-4 bg-[#ececec]'>
        <Routes>
          <Route path='/' element={<PandaDashboard />} />
          <Route path='/pandas/:id' element={<PandaDetail />} />
          <Route path='/pandas/:id/edit' element={<PandaEdit />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
