import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';

function Integraciones() {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState('');
  const [loading, setLoading] = useState(true); // Estado para manejar el cargando
  const [error, setError] = useState(null); // Estado para manejar errores

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/integraciones'); // Ajusta la URL si el backend está en otro puerto o dominio
        setTableData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener integraciones:', error);
        setError('No se pudieron cargar las integraciones. Por favor, inténtalo más tarde.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return tableData.filter(row =>
      (row.Herramienta.toLowerCase().includes(searchTerm.toLowerCase()) ||
       row.Descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
       row.Fecha_Integracion.includes(searchTerm)) &&
      (filterActive === '' || row.Activa.toString() === filterActive)
    );
  }, [searchTerm, filterActive, tableData]);

  const columns = useMemo(() => [
    { Header: 'ID Integración', accessor: 'ID_Integracion' },
    { Header: 'Herramienta', accessor: 'Herramienta' },
    { Header: 'Descripción', accessor: 'Descripcion' },
    { Header: 'Fecha de Integración', accessor: 'Fecha_Integracion' },
    { Header: 'Activa', accessor: 'Activa', Cell: ({ value }) => (value === 1 ? 'Sí' : 'No') },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData }, useSortBy);

  const exportCSV = () => {
    const csvRows = [
      ['ID Integración', 'Herramienta', 'Descripción', 'Fecha de Integración', 'Activa'],
      ...filteredData.map(row => [
        row.ID_Integracion,
        row.Herramienta,
        `"${row.Descripcion}"`,
        row.Fecha_Integracion,
        row.Activa === 1 ? 'Sí' : 'No',
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'integraciones.csv');
    document.body.appendChild(link);
    link.click();
  };

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Integraciones</h1>

      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Buscar herramienta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={filterActive}
          onChange={(e) => setFilterActive(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="">Filtrar por estado</option>
          <option value="1">Activa</option>
          <option value="0">Inactiva</option>
        </select>
        <button onClick={exportCSV} style={styles.exportButton}>Exportar CSV</button>
      </div>

      <table {...getTableProps()} style={styles.table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={styles.th}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
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
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  searchInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '300px',
  },
  filterSelect: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginLeft: '10px',
  },
  exportButton: {
    padding: '10px 20px',
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
    cursor: 'pointer',
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
  },
};

export default Integraciones;
