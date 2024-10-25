import React, { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useTable, useSortBy } from 'react-table';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Reportes() {
  const navigate = useNavigate();

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
    { id: 1, time: 'Jue 30 2024 11:30:42', status: 'ZEEK', category: 'NETWORK', description: 'SQL Injection detectado' },
    { id: 2, time: 'Jue 30 2024 11:30:54', status: 'ZEEK', category: 'APPLICATION', description: 'XSS Vulnerabilidad' },
    { id: 3, time: 'Jue 30 2024 11:30:57', status: 'ZEEK', category: 'NETWORK', description: 'Ataque de fuerza bruta' },
    { id: 4, time: 'Jue 30 2024 11:31:02', status: 'ZEEK', category: 'APPLICATION', description: 'Buffer overflow detectado' },
  ], []);

  const filteredData = useMemo(() => {
    return tableData.filter(row =>
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
      ['ID', 'TIEMPO', 'STATUS', 'CATEGORIA', 'DESCRIPCION'], 
      ...filteredData.map(row => [
        row.id,
        row.time,
        row.status,
        row.category,
        `"${row.description}"`
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
          <option value="">Filtrar por categoría</option>
          <option value="NETWORK">NETWORK</option>
          <option value="APPLICATION">APPLICATION</option>
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
