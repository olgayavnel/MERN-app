import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PandaDetail from './pages/PandaDetail';
import PandaDashboard from './components/PandaDashboard';
import { NotFound } from './pages/NotFound';
import PandaEdit from './pages/PandaEdit';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<PandaDashboard />} />
          <Route path='/pandas/:id' element={<PandaDetail />} />
          <Route path='/pandas/:id/edit' element={<PandaEdit />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
