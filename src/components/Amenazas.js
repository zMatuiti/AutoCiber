import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import axios from 'axios';

function Amenazas() {
  const [amenazas, setAmenazas] = useState([]);
  const [estados, setEstados] = useState([]);
  const [nivelesSeveridad, setNivelesSeveridad] = useState([]);
  const [nuevaAmenaza, setNuevaAmenaza] = useState({
    Fecha_deteccion: '',
    Nivel_severidad: '',
    Descripcion: '',
    Estado: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Obtener datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [amenazasRes, estadosRes, nivelesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/amenazas'),
          axios.get('http://localhost:5000/api/estado_amenaza'),
          axios.get('http://localhost:5000/api/nivel_severidad'),
        ]);
        setAmenazas(amenazasRes.data);
        setEstados(estadosRes.data);
        setNivelesSeveridad(nivelesRes.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    fetchData();
  }, []);

  const agregarAmenaza = async () => {
    const { Fecha_deteccion, Nivel_severidad, Descripcion, Estado } = nuevaAmenaza;
  
    if (!Fecha_deteccion || !Nivel_severidad || !Descripcion || !Estado) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
  
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/amenazas', {
        Fecha_deteccion,
        Nivel_severidad,
        Descripcion,
        Estado,
      });
      setAmenazas([...amenazas, { ID_Amenaza: response.data.ID_Amenaza, ...nuevaAmenaza }]);
      setNuevaAmenaza({
        Fecha_deteccion: '',
        Nivel_severidad: '',
        Descripcion: '',
        Estado: '',
      });
    } catch (error) {
      console.error('Error al agregar amenaza:', error);
      alert('Hubo un error al agregar la amenaza.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const data = useMemo(() => amenazas, [amenazas]);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'ID_Amenaza' },
      /*{ Header: 'Tipo Amenaza', accessor: 'ID_tipo_amenaza' },*/
      { Header: 'Descripción', accessor: 'Descripcion' },
      { Header: 'Fecha Detección', accessor: 'Fecha_deteccion' },
      { Header: 'Severidad', accessor: 'Nivel_severidad' },
      { Header: 'Estado', accessor: 'Estado' },
    ],
    [amenazas]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Amenazas</h1>

      <div style={styles.formContainer}>
        <input
          type="date"
          value={nuevaAmenaza.Fecha_deteccion}
          onChange={(e) => setNuevaAmenaza({ ...nuevaAmenaza, Fecha_deteccion: e.target.value })}
          placeholder="Fecha de Detección"
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevaAmenaza.Descripcion}
          onChange={(e) => setNuevaAmenaza({ ...nuevaAmenaza, Descripcion: e.target.value })}
          style={styles.input}
        />
        <select
          value={nuevaAmenaza.Nivel_severidad}
          onChange={(e) => setNuevaAmenaza({ ...nuevaAmenaza, Nivel_severidad: e.target.value })}
          style={styles.input}
        >
          <option value="">Seleccionar Severidad</option>
          {nivelesSeveridad.map((nivel) => (
            <option key={nivel.Nivel} value={nivel.Nivel}>
              {nivel.Nivel}
            </option>
          ))}
        </select>
        <select
          value={nuevaAmenaza.Estado}
          onChange={(e) => setNuevaAmenaza({ ...nuevaAmenaza, Estado: e.target.value })}
          style={styles.input}
        >
          <option value="">Seleccionar Estado</option>
          {estados.map((estado) => (
            <option key={estado.Estado} value={estado.Estado}>
              {estado.Estado}
            </option>
          ))}
        </select>
        <button onClick={agregarAmenaza} style={styles.addButton} disabled={isSubmitting}>
          {isSubmitting ? 'Agregando...' : 'Agregar Amenaza'}
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
};

export default Amenazas;
