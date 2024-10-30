import React from 'react';

function Amenazas() {
  const datosAmenaza = [
    { id: 1, tipo: 'Malware', fecha: '2024-10-01', severidad: 'Alta', descripcion: 'Amenaza de malware', estado: 'Activa' },
    { id: 2, tipo: 'Phishing', fecha: '2024-10-05', severidad: 'Media', descripcion: 'Amenaza de phishing', estado: 'Mitigada' },
  ];

  return (
    <div style={styles.container}>
      <h2>Amenazas</h2>
      <div style={styles.grid}>
        {datosAmenaza.map((amenaza) => (
          <div key={amenaza.id} style={styles.card}>
            <h3>{amenaza.tipo}</h3>
            <p><strong>Fecha:</strong> {amenaza.fecha}</p>
            <p><strong>Severidad:</strong> {amenaza.severidad}</p>
            <p><strong>Descripción:</strong> {amenaza.descripcion}</p>
            <p><strong>Estado:</strong> {amenaza.estado}</p>
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

export default Amenazas;
