import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Monitoreo from './components/Monitoreo';
import Reportes from './components/Reportes';
import Vulnerabilidades from './components/Vulnerabilidades';
import Usuarios from './components/Usuarios';
import Incidentes from './components/Incidentes';
import Politicas from './components/Politicas';
import Integraciones from './components/Integraciones';
import Layout from './components/Layout';
import Dispositivos from './components/Dispositivos';
import Amenazas from './components/Amenazas';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de Login */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        {/* Rutas protegidas con Layout */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" replace />
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="amenazas" element={<Amenazas />} />
          <Route path="monitoreo" element={<Monitoreo />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="vulnerabilidades" element={<Vulnerabilidades />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="dispositivos" element={<Dispositivos />} />
          <Route path="incidentes" element={<Incidentes />} />
          <Route path="politicas" element={<Politicas />} />
          <Route path="integraciones" element={<Integraciones />} />
        </Route>

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
