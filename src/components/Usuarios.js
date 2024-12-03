import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Usuarios() {
  const [datosUsuario, setDatosUsuario] = useState([]);
  const [roles, setRoles] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    rol: '',
    email: '',
    fecha: '',
    password: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Estado para el modal de eliminación
  const [userToDelete, setUserToDelete] = useState(null); // Usuario que se va a eliminar
  const [error, setError] = useState('');

  // Cargar usuarios existentes
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/usuarios');
        const usuariosMapeados = response.data.map((usuario) => ({
          id: usuario.ID_usuario,
          nombre: usuario.Nombre,
          rol: usuario.Rol,
          email: usuario.Email,
          fecha: usuario.Fecha_creacion,
        }));
        setDatosUsuario(usuariosMapeados);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  // Cargar roles desde el backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Error al cargar roles:', error);
      }
    };

    fetchRoles();
  }, []);

  // Agregar un usuario
  const agregarUsuario = async () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.rol || !nuevoUsuario.email || !nuevoUsuario.fecha || !nuevoUsuario.password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/usuarios', {
        Nombre: nuevoUsuario.nombre,
        Rol: nuevoUsuario.rol,
        Email: nuevoUsuario.email,
        Pw: nuevoUsuario.password,
        Fecha_creacion: nuevoUsuario.fecha,
      });
      setDatosUsuario([
        ...datosUsuario,
        {
          id: response.data.data.ID_usuario,
          nombre: nuevoUsuario.nombre,
          rol: nuevoUsuario.rol,
          email: nuevoUsuario.email,
          fecha: nuevoUsuario.fecha,
        },
      ]);
      setNuevoUsuario({ nombre: '', rol: '', email: '', fecha: '', password: '' });
      setIsModalOpen(false);
      setError('');
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      setError('No se pudo agregar el usuario. Intenta nuevamente.');
    }
  };

  // Abrir el modal de confirmación para eliminar usuario (validar si es administrador)
  const handleDeleteClick = (usuario) => {
    if (usuario.rol === 'administrador') {
      setError('No se puede eliminar a un administrador.');
      return;
    }
    setUserToDelete(usuario.id);
    setDeleteModalOpen(true);
  };

  // Eliminar usuario
  const eliminarUsuario = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/usuarios/${userToDelete}`);
      setDatosUsuario(datosUsuario.filter((usuario) => usuario.id !== userToDelete));
      setDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setError('No se pudo eliminar el usuario. Intenta nuevamente.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Usuarios</h2>
      <button onClick={() => setIsModalOpen(true)} style={styles.addButton}>
        Agregar Usuario
      </button>

      {/* Lista de usuarios */}
      <div style={styles.grid}>
        {datosUsuario.map((usuario) => (
          <div key={usuario.id} style={styles.card}>
            <button
              onClick={() => handleDeleteClick(usuario)}
              style={styles.deleteButton}
            >
              X
            </button>
            <h3>{usuario.nombre}</h3>
            <p><strong>Rol:</strong> {usuario.rol}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Fecha de creación:</strong> {usuario.fecha}</p>
          </div>
        ))}
      </div>

      {/* Modal para agregar usuario */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Agregar Usuario</h3>
            {error && <p style={styles.error}>{error}</p>}
            <input
              type="text"
              placeholder="Nombre"
              value={nuevoUsuario.nombre}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
              style={styles.input}
            />
            <select
              value={nuevoUsuario.rol}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}
              style={styles.input}
            >
              <option value="">Seleccionar Rol</option>
              {roles.map((rol, index) => (
                <option key={index} value={rol}>
                  {rol}
                </option>
              ))}
            </select>
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

      {/* Modal para eliminar usuario */}
      {deleteModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>¿Estás seguro de que deseas eliminar este usuario?</h3>
            <button onClick={eliminarUsuario} style={styles.deleteConfirmButton}>
              Sí, eliminar
            </button>
            <button
              onClick={() => {
                setDeleteModalOpen(false);
                setUserToDelete(null);
              }}
              style={styles.cancelButton}
            >
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
  deleteButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    width: '25px',
    height: '25px',
    fontSize: '14px',
  },
  grid: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  card: {
    position: 'relative',
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo más oscuro
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '30px', // Reduce el padding
    borderRadius: '15px', // Bordes más redondeados
    width: '400px',
    maxWidth: '90%', // Adaptable a pantallas pequeñas
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', // Sombra más pronunciada
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
    padding: '10px 25px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '8px', 
    cursor: 'pointer',
    fontSize: '16px', 
    transition: 'background-color 0.3s ease', 
  },
  deleteConfirmButton: {
    padding: '10px 25px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '8px', 
    cursor: 'pointer',
    fontSize: '16px', 
    marginRight: '15px', 
    transition: 'background-color 0.3s ease', 
  },
};

export default Usuarios;
