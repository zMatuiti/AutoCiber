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
  const [otherProgress, setOtherProgress] = useState(0);
  const [incidentDetails, setIncidentDetails] = useState([]);
  const [lineData, setLineData] = useState(null);
  const [pieData, setPieData] = useState(null);

  const fetchData = async () => {
    try {
      // Obtener datos generales para las tarjetas
      const responseStats = await axios.get('http://localhost:5000/api/dashboard-stats');
      setReportCount(responseStats.data.reportCount);
      setAttackCount(responseStats.data.attackCount);
      setVulnerabilityProgress(responseStats.data.vulnerabilityProgress);
      setOtherProgress(responseStats.data.otherProgress);

      // Obtener datos para la tabla
      const responseIncidents = await axios.get('http://localhost:5000/api/incidentes');
      setIncidentDetails(responseIncidents.data);

      // Obtener datos para gráficos
      const responseCharts = await axios.get('http://localhost:5000/api/dashboard-charts');
      setLineData(responseCharts.data.lineData);
      setPieData(responseCharts.data.pieData);
    } catch (error) {
      console.error('Error al cargar datos del backend:', error);
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
      y: { title: { display: true, text: 'Cantidad de Reportes' } },
    },
  };

  return (
    <div className="dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="dash_title">Dashboard</h1>
        <button onClick={fetchData} style={styles.refreshButton}>
          Actualizar
        </button>
      </div>

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
          <div className="circular-container">
            <CircularProgressbar
              value={vulnerabilityProgress}
              text={`${vulnerabilityProgress}%`}
              styles={buildStyles({
                textSize: '24px',
                pathColor: 'green',
                textColor: 'black',
                trailColor: '#d6d6d6',
              })}
            />
          </div>
        </div>
      </div>
      {/* Espacio para agregar un script */}
      <script>
        {`console.log('Espacio para incluir scripts personalizados')`}
      </script>
    </div>
  );
}

const styles = {
  refreshButton: {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: 'blue',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Dashboard;
