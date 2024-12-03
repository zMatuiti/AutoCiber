import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dispositivos() {
  const [datosDispositivo, setDatosDispositivo] = useState([]);

  useEffect(() => {
    const fetchDispositivos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dispositivos');
        setDatosDispositivo(response.data);
      } catch (error) {
        console.error('Error al obtener dispositivos:', error);
      }
    };

    fetchDispositivos();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Dispositivos</h2>
      <div style={styles.grid}>
        {datosDispositivo.map((dispositivo) => (
          <div key={dispositivo.ID_dispositivo} style={styles.card}>
            <h3>{dispositivo.ID_tipo_dispositivo}</h3>
            <p><strong>IP:</strong> {dispositivo.IP}</p>
            <p><strong>Estado:</strong> {dispositivo.Estado}</p>
            <p><strong>Ubicación:</strong> {dispositivo.Ubicacion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  grid: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  card: {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '8px',
    width: '200px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default Dispositivos;
