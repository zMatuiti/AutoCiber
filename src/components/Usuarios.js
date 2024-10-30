import React from 'react';

function Usuarios() {
  const datosUsuario = [
    { id: 1, nombre: 'Juan Pérez', rol: 'Administrador', email: 'juan@example.com', fecha: '2023-08-10' },
    { id: 2, nombre: 'Ana Gómez', rol: 'Analista', email: 'ana@example.com', fecha: '2024-01-15' },
  ];

  return (
    <div style={styles.container}>
      <h2>Usuarios</h2>
      <div style={styles.grid}>
        {datosUsuario.map((usuario) => (
          <div key={usuario.id} style={styles.card}>
            <h3>{usuario.nombre}</h3>
            <p><strong>Rol:</strong> {usuario.rol}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Fecha de creación:</strong> {usuario.fecha}</p>
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

export default Usuarios;
