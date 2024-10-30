import React from 'react';

function Dispositivos() {
  const datosDispositivo = [
    { id: 1, tipo: 'Servidor', ip: '192.168.1.10', estado: 'Operativo', ubicacion: 'Sala de servidores' },
    { id: 2, tipo: 'Router', ip: '192.168.1.1', estado: 'Operativo', ubicacion: 'Oficina principal' },
  ];

  return (
    <div style={styles.container}>
      <h2>Dispositivos</h2>
      <div style={styles.grid}>
        {datosDispositivo.map((dispositivo) => (
          <div key={dispositivo.id} style={styles.card}>
            <h3>{dispositivo.tipo}</h3>
            <p><strong>IP:</strong> {dispositivo.ip}</p>
            <p><strong>Estado:</strong> {dispositivo.estado}</p>
            <p><strong>Ubicación:</strong> {dispositivo.ubicacion}</p>
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
