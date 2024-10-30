import React, { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useTable, useSortBy } from 'react-table';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
=======
>>>>>>> recuperacion

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Reportes() {
<<<<<<< HEAD
  const navigate = useNavigate();

=======
>>>>>>> recuperacion
  // Datos del gráfico de barras
  const data = {
    labels: Array.from({ length: 21 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Zeek',
        data: [50, 60, 75, 80, 90, 50, 25, 35, 20, 55, 65, 100, 80, 60, 40, 30, 55, 70, 40, 30, 25],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: {
        display: true,
        text: 'Actividad de Zeek por Día',
      },
    },
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const tableData = useMemo(() => [
<<<<<<< HEAD
    { id: 1, time: 'Jue 30 2024 11:30:42', status: 'ZEEK', category: 'NETWORK', description: 'SQL Injection detectado' },
    { id: 2, time: 'Jue 30 2024 11:30:54', status: 'ZEEK', category: 'APPLICATION', description: 'XSS Vulnerabilidad' },
    { id: 3, time: 'Jue 30 2024 11:30:57', status: 'ZEEK', category: 'NETWORK', description: 'Ataque de fuerza bruta' },
    { id: 4, time: 'Jue 30 2024 11:31:02', status: 'ZEEK', category: 'APPLICATION', description: 'Buffer overflow detectado' },
=======
    { id: 1, Fecha_Generacion: '2024-10-30', Tipo_Reporte: 'Análisis de Red', Detalles: 'SQL Injection detectado', Generado_Por: 'Juan Pérez', ID_Usuario: 1 },
    { id: 2, Fecha_Generacion: '2024-10-30', Tipo_Reporte: 'Análisis de Aplicación', Detalles: 'XSS Vulnerabilidad', Generado_Por: 'Ana Gómez', ID_Usuario: 2 },
    { id: 3, Fecha_Generacion: '2024-10-30', Tipo_Reporte: 'Análisis de Red', Detalles: 'Ataque de fuerza bruta', Generado_Por: 'Juan Pérez', ID_Usuario: 1 },
    { id: 4, Fecha_Generacion: '2024-10-30', Tipo_Reporte: 'Análisis de Aplicación', Detalles: 'Buffer overflow detectado', Generado_Por: 'Ana Gómez', ID_Usuario: 2 },
>>>>>>> recuperacion
  ], []);

  const filteredData = useMemo(() => {
    return tableData.filter(row =>
<<<<<<< HEAD
      row.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterCategory || row.category === filterCategory)
    );
  }, [searchTerm, filterCategory, tableData]); 

  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'TIEMPO', accessor: 'time' },
    { Header: 'STATUS', accessor: 'status' },
    { Header: 'CATEGORIA', accessor: 'category' },
    { Header: 'DESCRIPCION', accessor: 'description' },
=======
      row.Detalles.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterCategory || row.Tipo_Reporte === filterCategory)
    );
  }, [searchTerm, filterCategory, tableData]);

  const columns = useMemo(() => [
    { Header: 'ID Reporte', accessor: 'id' },
    { Header: 'Fecha de Generación', accessor: 'Fecha_Generacion' },
    { Header: 'Tipo de Reporte', accessor: 'Tipo_Reporte' },
    { Header: 'Detalles', accessor: 'Detalles' },
    { Header: 'Generado Por', accessor: 'Generado_Por' },
    { Header: 'ID Usuario', accessor: 'ID_Usuario' },
>>>>>>> recuperacion
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
<<<<<<< HEAD
      ['ID', 'TIEMPO', 'STATUS', 'CATEGORIA', 'DESCRIPCION'], 
      ...filteredData.map(row => [
        row.id,
        row.time,
        row.status,
        row.category,
        `"${row.description}"`
=======
      ['ID Reporte', 'Fecha de Generación', 'Tipo de Reporte', 'Detalles', 'Generado Por', 'ID Usuario'],
      ...filteredData.map(row => [
        row.id,
        row.Fecha_Generacion,
        row.Tipo_Reporte,
        `"${row.Detalles}"`,
        row.Generado_Por,
        row.ID_Usuario,
>>>>>>> recuperacion
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
<<<<<<< HEAD
    link.setAttribute('download', 'reportes.csv'); 
=======
    link.setAttribute('download', 'reportes.csv');
>>>>>>> recuperacion
    document.body.appendChild(link);
    link.click();
  };

<<<<<<< HEAD

=======
>>>>>>> recuperacion
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
<<<<<<< HEAD
          <option value="">Filtrar por categoría</option>
          <option value="NETWORK">NETWORK</option>
          <option value="APPLICATION">APPLICATION</option>
=======
          <option value="">Filtrar por tipo de reporte</option>
          <option value="Análisis de Red">Análisis de Red</option>
          <option value="Análisis de Aplicación">Análisis de Aplicación</option>
>>>>>>> recuperacion
        </select>
        <button onClick={exportCSV} style={styles.exportButton}>Exportar CSV</button>
      </div>

      {/* Gráfico de barras */}
      <div style={styles.chartContainer}>
        <Bar data={data} options={options} />
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
  chartContainer: {
    marginTop: '20px',
    marginBottom: '40px',
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
