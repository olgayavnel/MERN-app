import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col h-screen'>
      <header className='px-6 py-4 text-white bg-gray-800'>
        <h1 className='text-2xl font-bold'>
          <Link to='/' aria-label='Return to dashboard' className='text-white'>
            🐼 Happy Panda
          </Link>
        </h1>
      </header>
      <main className='flex-1 px-4 py-4'>{children}</main>
      <footer className='px-6 py-4 text-white bg-gray-800'>
        <p>&copy; 2023 Panda Management Tool</p>
      </footer>
    </div>
  );
};

export default Layout;
