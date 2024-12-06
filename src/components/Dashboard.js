import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import "./Dashboard.css";
import axios from "axios";

function Dashboard() {
  const [reportCount, setReportCount] = useState(0);
  const [policyCount, setPolicyCount] = useState(0);
  const [incidentCount, setIncidentCount] = useState(0);
  const [resolvedThreatsPercentage, setResolvedThreatsPercentage] = useState(0); // Porcentaje de amenazas resueltas
  const [reportDetails, setReportDetails] = useState([]);
  const [incidentDetails, setIncidentDetails] = useState([]);
  const [activePolicies, setActivePolicies] = useState([]);
  const [threatsInProcessOrPending, setThreatsInProcessOrPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const responsePolicies = await axios.get("http://localhost:5000/api/politicas");
      const activePolicies = responsePolicies.data.filter((policy) => policy.Activa === 1);
      setActivePolicies(activePolicies);
      setPolicyCount(activePolicies.length);

      const responseReports = await axios.get("http://localhost:5000/api/reportes");
      setReportCount(responseReports.data.length || 0);
      setReportDetails(responseReports.data);

      const responseIncidents = await axios.get("http://localhost:5000/api/incidentes");
      setIncidentDetails(responseIncidents.data);
      setIncidentCount(responseIncidents.data.length);

      const responseThreats = await axios.get("http://localhost:5000/api/amenazas");
      const threats = responseThreats.data;

      // Calcular amenazas resueltas
      const resolvedThreats = threats.filter((threat) => threat.Estado === "resuelto").length;
      const totalThreats = threats.length;
      const percentage = totalThreats > 0 ? ((resolvedThreats / totalThreats) * 100).toFixed(2) : 0;
      setResolvedThreatsPercentage(percentage);

      // Filtrar amenazas en estado "en proceso" o "pendiente"
      const filteredThreats = threats.filter(
        (threat) => threat.Estado === "en proceso" || threat.Estado === "pendiente"
      );
      setThreatsInProcessOrPending(filteredThreats);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const policyColumns = useMemo(
    () => [
      { Header: "Nombre", accessor: "Nombre" },
      { Header: "Descripcion", accessor: "Descripcion" },
      { Header: "Fecha", accessor: "Fecha_implementacion" },
    ],
    []
  );

  const reportColumns = useMemo(
    () => [
      { Header: "ID", accessor: "ID_Reporte" },
      { Header: "Fecha", accessor: "Fecha_Generacion" },
      { Header: "Tipo", accessor: "Tipo_Reporte" },
      { Header: "Detalles", accessor: "Detalles" },
      { Header: "Generado Por", accessor: "Generado_Por" },
    ],
    []
  );

  const incidentColumns = useMemo(
    () => [
      { Header: "Descripción", accessor: "Descripcion" },
      { Header: "Estado", accessor: "Estado" },
    ],
    []
  );

  const threatsColumns = useMemo(
    () => [
      { Header: "ID Amenaza", accessor: "ID_Amenaza" },
      { Header: "Tipo Amenaza", accessor: "ID_tipo_amenaza" },
      { Header: "Fecha Detección", accessor: "Fecha_deteccion" },
      { Header: "Severidad", accessor: "Nivel_severidad" },
      { Header: "Descripción", accessor: "Descripcion" },
      { Header: "Estado", accessor: "Estado" },
    ],
    []
  );

  const policyTable = useTable({ columns: policyColumns, data: activePolicies }, useSortBy);
  const reportTable = useTable({ columns: reportColumns, data: reportDetails }, useSortBy);
  const incidentTable = useTable({ columns: incidentColumns, data: incidentDetails }, useSortBy);
  const threatsTable = useTable({ columns: threatsColumns, data: threatsInProcessOrPending }, useSortBy);

  const renderTable = (tableInstance) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
      <table {...getTableProps()} className="data-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
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
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
            <div className="card">
              <h2>Políticas Activas</h2>
              <p className="card-value">{policyCount}</p>
            </div>
            <div className="card">
              <h2>Incidentes Recientes</h2>
              <p className="card-value">{incidentCount}</p>
            </div>
            <div className="card">
              <h2>% Amenazas Resueltas</h2>
              <p className="card-value">{resolvedThreatsPercentage}%</p>
            </div>
          </div>

          <div className="table-container">
            <div className="table-item">
              <h2>Políticas de Seguridad Activas</h2>
              {renderTable(policyTable)}
            </div>
            <div className="table-item">
              <h2>Incidentes Recientes</h2>
              {renderTable(incidentTable)}
            </div>
          </div>


          <div className="data-table">
            <h2>Detalles de Reportes</h2>
            {renderTable(reportTable)}
          </div>

          <div className="data-table">
            <h2>Amenazas en Proceso o Pendiente</h2>
            {renderTable(threatsTable)}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
