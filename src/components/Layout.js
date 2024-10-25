import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; 

function Layout() {
  return (
    <div>
      <Navbar />
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

const styles = {
  content: {
    padding: '20px',
  },
};

export default Layout;
