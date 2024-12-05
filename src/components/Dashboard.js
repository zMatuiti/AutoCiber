import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Dashboard.css';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [reportCount, setReportCount] = useState(0);
  const [attackCount, setAttackCount] = useState(0);
  const [vulnerabilityProgress, setVulnerabilityProgress] = useState(0);
  const [incidentDetails, setIncidentDetails] = useState([]);
  const [lineData, setLineData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const responseStats = await axios.get('http://localhost:5000/api/dashboard-stats');
      setReportCount(responseStats.data.reportCount);
      setAttackCount(responseStats.data.attackCount);
      setVulnerabilityProgress(responseStats.data.vulnerabilityProgress);

      const responseIncidents = await axios.get('http://localhost:5000/api/incidentes');
      setIncidentDetails(responseIncidents.data);

      const responseCharts = await axios.get('http://localhost:5000/api/dashboard-charts');
      setLineData(responseCharts.data.lineData || null);
      setPieData(responseCharts.data.pieData || null);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Actividad de Reportes' },
    },
    scales: {
      x: { title: { display: true, text: 'Meses' } },
      y: { title: { display: true, text: 'Cantidad' } },
    },
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
              <h2>Posibles Ataques</h2>
              <p className="card-value">{attackCount}</p>
            </div>
            <div className="card">
              <h2>Vulnerabilidades</h2>
              <CircularProgressbar
                value={vulnerabilityProgress}
                text={`${vulnerabilityProgress}%`}
                styles={buildStyles({
                  textSize: '16px',
                  pathColor: 'green',
                  textColor: 'black',
                  trailColor: '#d6d6d6',
                })}
              />
            </div>
          </div>

          <div className="chart-row">
            {lineData && lineData.labels ? (
              <div className="chart-container">
                <Line options={lineOptions} data={lineData} />
              </div>
            ) : (
              <p>No hay datos para el gráfico de línea.</p>
            )}
            {pieData && pieData.labels ? (
              <div className="chart-container">
                <Pie
                  data={pieData}
                  options={{
                    plugins: {
                      legend: { position: 'right' },
                      title: { display: true, text: 'Distribución de Amenazas' },
                    },
                  }}
                />
              </div>
            ) : (
              <p>No hay datos para el gráfico de pastel.</p>
            )}
          </div>

          <div className="data-table">
            <h2>Incidentes Recientes</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Usuario</th>
                </tr>
              </thead>
              <tbody>
                {incidentDetails.length > 0 ? (
                  incidentDetails.map((incident) => (
                    <tr key={incident.ID_Incidente}>
                      <td>{incident.ID_Incidente}</td>
                      <td>{incident.Descripcion}</td>
                      <td>{incident.Estado}</td>
                      <td>{incident.ID_Usuario}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No hay incidentes recientes.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
