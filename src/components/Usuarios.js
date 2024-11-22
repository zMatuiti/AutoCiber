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
    password: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const agregarUsuario = () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.rol || !nuevoUsuario.email || !nuevoUsuario.fecha || !nuevoUsuario.password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const nuevoId = datosUsuario.length + 1;
    setDatosUsuario([...datosUsuario, { id: nuevoId, ...nuevoUsuario }]);
    setNuevoUsuario({ nombre: '', rol: '', email: '', fecha: '', password: '' });
    setIsModalOpen(false); // Cerrar la ventana modal
  };

  return (
    <div style={styles.container}>
      <h2>Usuarios</h2>

      {/* Botón para abrir la ventana modal */}
      <button onClick={() => setIsModalOpen(true)} style={styles.addButton}>
        Agregar Usuario
      </button>

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

      {/* Ventana modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Agregar Usuario</h3>
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
            <input
              type="password"
              placeholder="Contraseña"
              value={nuevoUsuario.password}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
              style={styles.input}
            />
            <button onClick={agregarUsuario} style={styles.saveButton}>
              Guardar
            </button>
            <button onClick={() => setIsModalOpen(false)} style={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  grid: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  card: {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '8px',
    width: '200px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '50px',
    borderRadius: '10px',
    width: '500px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',
    marginBottom: '10px',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Usuarios;
