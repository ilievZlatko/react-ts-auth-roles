import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <main data-testid="App" className="App">
      <Outlet />
    </main>
  );
};

export default Layout;
