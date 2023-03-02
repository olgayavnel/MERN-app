import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col h-screen'>
      <header className='px-6 py-4 text-slate-50 bg-emerald-900'>
        <h1 className='mb-0 text-2xl font-bold'>
          <Link
            to='/'
            aria-label='Return to dashboard'
            className=' text-slate-50 hover:text-yellow-200'
          >
            🐼 Happy Panda
          </Link>
        </h1>
      </header>
      <main className='flex-1 px-4 py-4 md:overflow-hidden'>{children}</main>
      <footer className='px-6 py-4 bg-emerald-900 text-slate-50'>
        <p>&copy; 2023 Panda Management Tool</p>
      </footer>
    </div>
  );
};

export default Layout;
