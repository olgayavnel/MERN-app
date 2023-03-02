import React from 'react';

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <div className='container mx-auto my-8 text-center'>
      <h1
        className='mb-4 text-5xl font-extrabold text-emerald-900'
        tabIndex={0}
      >
        404
      </h1>
      <h2 className='text-2xl font-bold text-gray-600' tabIndex={0}>
        Page not found
      </h2>
      <p className='mt-4 text-lg text-gray-600' tabIndex={0}>
        The requested page does not exist.
      </p>
    </div>
  );
};
