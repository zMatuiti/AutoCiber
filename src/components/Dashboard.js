import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import './Dashboard.css';
import axios from 'axios';

function Dashboard() {
  const [reportCount, setReportCount] = useState(0);
  const [reportDetails, setReportDetails] = useState([]);
  const [incidentDetails, setIncidentDetails] = useState([]);
  const [activePolicies, setActivePolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const responsePolicies = await axios.get('http://localhost:5000/api/politicas');
      const activePolicies = responsePolicies.data.filter((policy) => policy.Activa === 1);
      setActivePolicies(activePolicies);

      const responseReports = await axios.get('http://localhost:5000/api/reportes');
      setReportCount(responseReports.data.length || 0);
      setReportDetails(responseReports.data);

      const responseIncidents = await axios.get('http://localhost:5000/api/incidentes');
      setIncidentDetails(responseIncidents.data);

      await axios.get('http://localhost:5000/api/scriptRoutes');
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const policyColumns = useMemo(
    () => [
      { Header: 'Nombre', accessor: 'Nombre' },
      { Header: 'Descripcion', accessor: 'Descripcion' },
      { Header: 'Fecha', accessor: 'Fecha_implementacion' },
    ],
    []
  );

  const reportColumns = useMemo(
    () => [
      { Header: 'ID', accessor: 'ID_Reporte' },
      { Header: 'Fecha', accessor: 'Fecha_Generacion' },
      { Header: 'Tipo', accessor: 'Tipo_Reporte' },
      { Header: 'Detalles', accessor: 'Detalles' },
      { Header: 'Generado Por', accessor: 'Generado_Por' },
    ],
    []
  );

  const incidentColumns = useMemo(
    () => [
      { Header: 'Descripción', accessor: 'Descripcion' },
      { Header: 'Estado', accessor: 'Estado' },
    ],
    []
  );

  const policyTable = useTable({ columns: policyColumns, data: activePolicies }, useSortBy);
  const reportTable = useTable({ columns: reportColumns, data: reportDetails }, useSortBy);
  const incidentTable = useTable({ columns: incidentColumns, data: incidentDetails }, useSortBy);

  const renderTable = (tableInstance) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
      <table {...getTableProps()} className="data-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="dashboard-container">
      <h1 className="dash_title">Dashboard</h1>
      <button onClick={fetchData} className="refresh-button">
        Actualizar
      </button>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <>
          <div className="cards-container">
            <div className="card">
              <h2>Reportes</h2>
              <p className="card-value">{reportCount}</p>
            </div>
          </div>

          <div className="data-table">
            <h2>Políticas de Seguridad Activas</h2>
            {renderTable(policyTable)}
          </div>

          <div className="data-table">
            <h2>Detalles de Reportes</h2>
            {renderTable(reportTable)}
          </div>

          <div className="data-table">
            <h2>Incidentes Recientes</h2>
            {renderTable(incidentTable)}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
