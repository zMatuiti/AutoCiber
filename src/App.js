import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import Dispositivos from './components/Dispositivos' 

function App() {
  const isAuthenticated = true; 

  return (
    <Router>
      <Routes>
        {/* Ruta de Login */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
        />

        {/* Rutas protegidas dentro del Layout */}
        {isAuthenticated ? (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/monitoreo" element={<Monitoreo />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/vulnerabilidades" element={<Vulnerabilidades />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/dispositivos" element={<Dispositivos />} />
            <Route path="/incidentes" element={<Incidentes />} />
            <Route path="/politicas" element={<Politicas />} />
            <Route path="/integraciones" element={<Integraciones />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
