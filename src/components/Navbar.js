import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Sistema de Ciberseguridad</h1>
      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/monitoreo" style={styles.link}>Monitoreo</Link>
        <Link to="/vulnerabilidades" style={styles.link}>Vulnerabilidades</Link>
        <Link to="/reportes" style={styles.link}>Reportes</Link>
        <Link to="/usuarios" style={styles.link}>Usuarios</Link>
        <Link to="/incidentes" style={styles.link}>Incidentes</Link>
        <Link to="/politicas" style={styles.link}>Políticas</Link>
        <Link to="/integraciones" style={styles.link}>Integraciones</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
  },
};

export default Navbar;
