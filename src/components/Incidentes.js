import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import axios from 'axios';

function Incidentes() {
  const [incidentes, setIncidentes] = useState([]);
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
  const [nuevoIncidente, setNuevoIncidente] = useState({
    Fecha_Inicio: '',
    Fecha_Fin: '',
    Descripcion: '',
    Estado: '',
    Accion_Tomada: '',
    ID_Amenaza: '',
    ID_Dispositivo: '',
    ID_Usuario: '', // Cambiado para seleccionar del dropdown
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Obtener incidentes
  useEffect(() => {
    const fetchIncidentes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/incidentes');
        setIncidentes(response.data);
      } catch (error) {
        console.error('Error al obtener incidentes:', error);
      }
    };

    fetchIncidentes();
  }, []);

  // Obtener usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/usuarios'); // Endpoint para usuarios
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const agregarIncidente = async () => {
    if (!nuevoIncidente.Fecha_Inicio || !nuevoIncidente.Descripcion || !nuevoIncidente.Estado || !nuevoIncidente.ID_Usuario) {
      alert('Por favor, complete los campos obligatorios: Fecha de Inicio, Descripción, Estado y Usuario.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/incidentes', nuevoIncidente);
      setIncidentes([...incidentes, { ID_Incidente: response.data.ID_Incidente, ...nuevoIncidente }]);
      setNuevoIncidente({
        Fecha_Inicio: '',
        Fecha_Fin: '',
        Descripcion: '',
        Estado: '',
        Accion_Tomada: '',
        ID_Amenaza: '',
        ID_Dispositivo: '',
        ID_Usuario: '',
      });
    } catch (error) {
      console.error('Error al agregar incidente:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const abrirModalEliminar = (id) => {
    console.log('Abrir modal para eliminar incidente con ID:', id);
    setIncidentToDelete(id);
    setDeleteModalOpen(true);
  };

  const eliminarIncidente = async () => {
    if (!incidentToDelete) {
      console.error('No hay incidente seleccionado para eliminar.');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/incidentes/${incidentToDelete}`);
      setIncidentes(incidentes.filter((incidente) => incidente.ID_Incidente !== incidentToDelete));
      setDeleteModalOpen(false);
      setIncidentToDelete(null);
    } catch (error) {
      console.error('Error al eliminar incidente:', error);
    }
  };

  const data = useMemo(() => incidentes, [incidentes]);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'ID_Incidente' },
      { Header: 'Fecha de Inicio', accessor: 'Fecha_Inicio' },
      { Header: 'Fecha de Fin', accessor: 'Fecha_Fin' },
      { Header: 'Descripción', accessor: 'Descripcion' },
      { Header: 'Estado', accessor: 'Estado' },
      { Header: 'Acción Tomada', accessor: 'Accion_Tomada' },
      { Header: 'Amenaza', accessor: 'ID_Amenaza' },
      { Header: 'Dispositivo', accessor: 'ID_Dispositivo' },
      { Header: 'Usuario', accessor: 'ID_Usuario' },
      {
        Header: 'Eliminar',
        accessor: 'Eliminar',
        Cell: ({ row }) => (
          <button onClick={() => abrirModalEliminar(row.original.ID_Incidente)} style={styles.deleteButton}>
            X
          </button>
        ),
      },
    ],
    [incidentes]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );

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
        <input
          type="text"
          placeholder="ID Amenaza"
          value={nuevoIncidente.ID_Amenaza}
          onChange={(e) => setNuevoIncidente({ ...nuevoIncidente, ID_Amenaza: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="ID Dispositivo"
          value={nuevoIncidente.ID_Dispositivo}
          onChange={(e) => setNuevoIncidente({ ...nuevoIncidente, ID_Dispositivo: e.target.value })}
          style={styles.input}
        />
        <select
          value={nuevoIncidente.ID_Usuario}
          onChange={(e) => setNuevoIncidente({ ...nuevoIncidente, ID_Usuario: e.target.value })}
          style={styles.input}
        >
          <option value="">Seleccionar Usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.ID_Usuario} value={usuario.ID_Usuario}>
              {usuario.Nombre}
            </option>
          ))}
        </select>
        <button onClick={agregarIncidente} style={styles.addButton} disabled={isSubmitting}>
          {isSubmitting ? 'Agregando...' : 'Agregar Incidente'}
        </button>
      </div>

      <table {...getTableProps()} style={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={styles.th}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={styles.td}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal de confirmación para eliminar */}
      {deleteModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>¿Estás seguro de que deseas eliminar este incidente?</h3>
            <button onClick={eliminarIncidente} style={styles.deleteConfirmButton}>
              Sí, eliminar
            </button>
            <button
              onClick={() => {
                setDeleteModalOpen(false);
                setIncidentToDelete(null);
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
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  title: { fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' },
  formContainer: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' },
  input: { padding: '10px', borderRadius: '5px', border: '1px solid #ddd', width: '100%' },
  addButton: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '150px',
    alignSelf: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  th: {
    padding: '12px 15px',
    backgroundColor: '#f4f4f4',
    borderBottom: '2px solid #ddd',
    textAlign: 'left',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
    backgroundColor: '#ffffff',
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '15px',
    width: '400px',
    maxWidth: '90%',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
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
};

export default Incidentes;
