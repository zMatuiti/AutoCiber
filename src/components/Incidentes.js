import React, { useState } from 'react';

function Incidentes() {
  const [incidentes, setIncidentes] = useState([
    {
      ID_Incidente: 1,
      Fecha_Inicio: '2024-01-01',
      Fecha_Fin: '2024-01-02',
      Descripcion: 'Acceso no autorizado detectado',
      Estado: 'En Proceso',
      Accion_Tomada: 'Monitoreo del dispositivo afectado',
      ID_Amenaza: 101,
      ID_Dispositivo: 202,
      ID_Usuario: 303,
    },
  ]);

  const [nuevoIncidente, setNuevoIncidente] = useState({
    Fecha_Inicio: '',
    Fecha_Fin: '',
    Descripcion: '',
    Estado: '',
    Accion_Tomada: '',
  });

  const agregarIncidente = () => {
    if (!nuevoIncidente.Fecha_Inicio || !nuevoIncidente.Descripcion || !nuevoIncidente.Estado) {
      alert('Por favor, complete los campos obligatorios: Fecha de Inicio, Descripción y Estado.');
      return;
    }

    const nuevoID = incidentes.length + 1;
    setIncidentes([
      ...incidentes,
      { ID_Incidente: nuevoID, ...nuevoIncidente },
    ]);

    setNuevoIncidente({
      Fecha_Inicio: '',
      Fecha_Fin: '',
      Descripcion: '',
      Estado: '',
      Accion_Tomada: '',
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Incidentes</h1>

      <div style={styles.formContainer}>
        <input
          type="date"
          placeholder="Fecha de Inicio"
          value={nuevoIncidente.Fecha_Inicio}
          onChange={(e) => setNuevoIncidente({ ...nuevoIncidente, Fecha_Inicio: e.target.value })}
          style={styles.input}
        />
        <input
          type="date"
          placeholder="Fecha de Fin"
          value={nuevoIncidente.Fecha_Fin}
          onChange={(e) => setNuevoIncidente({ ...nuevoIncidente, Fecha_Fin: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevoIncidente.Descripcion}
          onChange={(e) => setNuevoIncidente({ ...nuevoIncidente, Descripcion: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Estado"
          value={nuevoIncidente.Estado}
          onChange={(e) => setNuevoIncidente({ ...nuevoIncidente, Estado: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Acción Tomada"
          value={nuevoIncidente.Accion_Tomada}
          onChange={(e) => setNuevoIncidente({ ...nuevoIncidente, Accion_Tomada: e.target.value })}
          style={styles.input}
        />
        <button onClick={agregarIncidente} style={styles.addButton}>Agregar Incidente</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acción Tomada</th>
          </tr>
        </thead>
        <tbody>
          {incidentes.map((incidente) => (
            <tr key={incidente.ID_Incidente}>
              <td style={styles.textCenter}>{incidente.ID_Incidente}</td>
              <td style={styles.textCenter}>{incidente.Fecha_Inicio}</td>
              <td style={styles.textCenter}>{incidente.Fecha_Fin}</td>
              <td style={styles.textCenter}>{incidente.Descripcion}</td>
              <td style={styles.textCenter}>{incidente.Estado}</td>
              <td style={styles.textCenter}>{incidente.Accion_Tomada}</td>
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
};

export default Incidentes;
