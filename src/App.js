import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Monitoreo from './components/Monitoreo';
import Reportes from './components/Reportes';
import Vulnerabilidades from './components/Vulnerabilidades';
import Layout from './components/Layout'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/monitoreo" element={<Monitoreo />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/vulnerabilidades" element={<Vulnerabilidades />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
