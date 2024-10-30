import React from 'react';
import { Outlet } from 'react-router-dom';
<<<<<<< HEAD
import Navbar from './Navbar'; 

function Layout() {
  return (
    <div>
=======
import Navbar from './Navbar';

function Layout() {
  return (
    <div style={styles.layoutContainer}>
>>>>>>> recuperacion
      <Navbar />
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

const styles = {
<<<<<<< HEAD
  content: {
    padding: '20px',
=======
  layoutContainer: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    marginTop: '20px',
>>>>>>> recuperacion
  },
};

export default Layout;
