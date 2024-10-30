import React from 'react';
import { useTable, useSortBy } from 'react-table';

// Datos de vulnerabilidades
const data = [
  { id: 1, description: 'SQL Injection en la Base de Datos', severity: 'Alta', status: 'Sin Resolver' },
  { id: 2, description: 'Cross-Site Scripting (XSS)', severity: 'Media', status: 'Resuelto' },
  { id: 3, description: 'Ataque de fuerza bruta detectado', severity: 'Alta', status: 'Investigando' },
];

// Definición de las columnas
const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Descripción', accessor: 'description' },
  { Header: 'Severidad', accessor: 'severity' },
  { Header: 'Estado', accessor: 'status' },
];

function Vulnerabilidades() {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy); // Añadimos el hook useSortBy para habilitar el ordenamiento

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Vulnerabilidades Detectadas</h1>
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
                  {/* Icono de ordenación */}
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
    cursor: 'pointer',
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
  },
};

export default Vulnerabilidades;
