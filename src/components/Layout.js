import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div style={styles.layoutContainer}>
      <Navbar />
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

const styles = {
  layoutContainer: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    marginTop: '20px',
  },
};

export default Layout;
