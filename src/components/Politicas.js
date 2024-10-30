import React, { useState } from 'react';

function Politicas() {
  const [politicas, setPoliticas] = useState([
    { ID_politica: 1, Nombre: 'Política de Acceso', Descripcion: 'Control de acceso a la red', Tipo: 'Acceso', Fecha_implementacion: '2024-01-15', Activa: 1 },
    { ID_politica: 2, Nombre: 'Política de Contraseña', Descripcion: 'Requisitos de contraseña segura', Tipo: 'Contraseña', Fecha_implementacion: '2024-02-20', Activa: 1 },
    { ID_politica: 3, Nombre: 'Política de Uso', Descripcion: 'Uso adecuado de dispositivos', Tipo: 'Uso', Fecha_implementacion: '2024-03-12', Activa: 0 },
    { ID_politica: 4, Nombre: 'Política de Seguridad', Descripcion: 'Medidas de seguridad para dispositivos', Tipo: 'Seguridad', Fecha_implementacion: '2024-04-18', Activa: 1 },
  ]);

  const [nuevaPolitica, setNuevaPolitica] = useState({
    Nombre: '',
    Descripcion: '',
    Tipo: '',
    Fecha_implementacion: '',
    Activa: 1,
  });

  const agregarPolitica = () => {
    if (
      !nuevaPolitica.Nombre ||
      !nuevaPolitica.Descripcion ||
      !nuevaPolitica.Tipo ||
      !nuevaPolitica.Fecha_implementacion
    ) {
      alert('Todos los campos deben estar llenos para agregar una política.');
      return;
    }

    const nuevaID = politicas.length + 1;
    setPoliticas([
      ...politicas,
      { ID_politica: nuevaID, ...nuevaPolitica },
    ]);
    setNuevaPolitica({
      Nombre: '',
      Descripcion: '',
      Tipo: '',
      Fecha_implementacion: '',
      Activa: 1,
    });
  };

  const eliminarPolitica = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta política?")) {
      setPoliticas((prevPoliticas) =>
        prevPoliticas.filter((politica) => politica.ID_politica !== id)
      );
    }
  };

  const toggleActiva = (id) => {
    setPoliticas((prevPoliticas) =>
      prevPoliticas.map((politica) =>
        politica.ID_politica === id ? { ...politica, Activa: politica.Activa === 1 ? 0 : 1 } : politica
      )
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Políticas de Seguridad</h1>

      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevaPolitica.Nombre}
          onChange={(e) => setNuevaPolitica({ ...nuevaPolitica, Nombre: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevaPolitica.Descripcion}
          onChange={(e) => setNuevaPolitica({ ...nuevaPolitica, Descripcion: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Tipo"
          value={nuevaPolitica.Tipo}
          onChange={(e) => setNuevaPolitica({ ...nuevaPolitica, Tipo: e.target.value })}
          style={styles.input}
        />
        <input
          type="date"
          placeholder="Fecha de Implementación"
          value={nuevaPolitica.Fecha_implementacion}
          onChange={(e) => setNuevaPolitica({ ...nuevaPolitica, Fecha_implementacion: e.target.value })}
          style={styles.input}
        />
        <button onClick={agregarPolitica} style={styles.addButton}>Agregar Política</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Fecha de Implementación</th>
            <th>Activa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {politicas.map((politica) => (
            <tr key={politica.ID_politica}>
              <td style={styles.textCenter}>{politica.Nombre}</td>
              <td style={styles.textCenter}>{politica.Descripcion}</td>
              <td style={styles.textCenter}>{politica.Tipo}</td>
              <td style={styles.textCenter}>{politica.Fecha_implementacion}</td>
              <td style={styles.textCenter}>{politica.Activa === 1 ? 'Sí' : 'No'}</td>
              <td style={styles.actionsCell}>
                <button onClick={() => toggleActiva(politica.ID_politica)} style={styles.toggleButton}>
                  {politica.Activa === 1 ? 'Desactivar' : 'Activar'}
                </button>
                <button onClick={() => eliminarPolitica(politica.ID_politica)} style={styles.deleteButton}>
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  th: {
    padding: '12px 15px',
    backgroundColor: '#f4f4f4',
    borderBottom: '2px solid #ddd',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
  textCenter: {
    textAlign: 'center',
  },
  actionsCell: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  toggleButton: {
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
  },
  deleteButton: {
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Politicas;
