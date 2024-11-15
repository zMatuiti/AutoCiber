import React, { useState } from 'react';

function Usuarios() {
  const [datosUsuario, setDatosUsuario] = useState([
    { id: 1, nombre: 'Juan Pérez', rol: 'Administrador', email: 'juan@example.com', fecha: '2023-08-10' },
    { id: 2, nombre: 'Ana Gómez', rol: 'Analista', email: 'ana@example.com', fecha: '2024-01-15' },
  ]);

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    rol: '',
    email: '',
    fecha: '',
  });

  const agregarUsuario = () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.rol || !nuevoUsuario.email || !nuevoUsuario.fecha) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const nuevoId = datosUsuario.length + 1;
    setDatosUsuario([...datosUsuario, { id: nuevoId, ...nuevoUsuario }]);
    setNuevoUsuario({ nombre: '', rol: '', email: '', fecha: '' });
  };

  return (
    <div style={styles.container}>
      <h2>Usuarios</h2>

      {/* Formulario para agregar nuevo usuario */}
      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Rol"
          value={nuevoUsuario.rol}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={nuevoUsuario.email}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
          style={styles.input}
        />
        <input
          type="date"
          placeholder="Fecha de creación"
          value={nuevoUsuario.fecha}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, fecha: e.target.value })}
          style={styles.input}
        />
        <button onClick={agregarUsuario} style={styles.addButton}>Agregar Usuario</button>
      </div>

      {/* Lista de usuarios */}
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
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  addButton: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Usuarios;
