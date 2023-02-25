import React from 'react';

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Page not found</h2>
    </div>
  );
};
