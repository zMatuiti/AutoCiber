import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import axios from 'axios';

function Reportes() {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Cargar datos desde el backend
  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reportes'); // Cambia la URL según tu backend
        setTableData(response.data);
      } catch (error) {
        console.error('Error al cargar reportes:', error);
      }
    };

    fetchReportes();
  }, []);

  // Filtrar datos
  const filteredData = useMemo(() => {
    return tableData.filter(row =>
      (row.Detalles.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.Generado_Por.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.Fecha_Generacion.includes(searchTerm)) &&
      (!filterCategory || row.Tipo_Reporte === filterCategory)
    );
  }, [searchTerm, filterCategory, tableData]);

  const columns = useMemo(() => [
    { Header: 'ID Reporte', accessor: 'ID_Reporte' },
    { Header: 'Fecha de Generación', accessor: 'Fecha_Generacion' },
    { Header: 'Tipo de Reporte', accessor: 'Tipo_Reporte' },
    { Header: 'Detalles', accessor: 'Detalles' },
    { Header: 'Generado Por', accessor: 'Generado_Por' },
    { Header: 'ID Usuario', accessor: 'ID_Usuario' },
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
      ['ID Reporte', 'Fecha de Generación', 'Tipo de Reporte', 'Detalles', 'Generado Por', 'ID Usuario'],
      ...filteredData.map(row => [
        row.ID_Reporte,
        row.Fecha_Generacion,
        row.Tipo_Reporte,
        `"${row.Detalles}"`,
        row.Generado_Por,
        row.ID_Usuario,
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'reportes.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Reportes</h1>
      </div>
      {/* Barra de búsqueda y filtros */}
      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Buscar reportes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="">Filtrar por tipo de reporte</option>
          <option value="Análisis de Red">Análisis de Red</option>
          <option value="Análisis de Aplicación">Análisis de Aplicación</option>
        </select>
        <button onClick={exportCSV} style={styles.exportButton}>Exportar CSV</button>
      </div>

      {/* Tabla de datos */}
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

export default Reportes;
