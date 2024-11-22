import React, { useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [reportCount, setReportCount] = useState(80);
  const [attackCount, setAttackCount] = useState(16);
  const [vulnerabilityProgress, setVulnerabilityProgress] = useState(75);
  const [otherProgress, setOtherProgress] = useState(15);

  const lineData = {
    labels: Array.from({ length: 10 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Vulnerabilidades',
        data: [500, 400, 600, 800, 700, 500, 600, 700, 800, 600],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Posibles Ataques',
        data: [200, 300, 400, 500, 600, 400, 300, 200, 400, 500],
        borderColor: 'blue',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  // Definición de barData para los gráficos de barras en las tarjetas
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Reportes',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Actividad de Reportes' }
    },
    scales: {
      x: { title: { display: true, text: 'Meses' } },
      y: { title: { display: true, text: 'Cantidad de Reportes' } }
    }
  };

  const pieData = {
    labels: ['Crítico', 'Alto', 'Moderado', 'Bajo'],
    datasets: [
      {
        data: [30, 50, 100, 40],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#66bb6a'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1 className="dash_title">Dashboard</h1>

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
        <div className="card">
          <h2>Otro</h2>
          <div className="circular-container">
            <CircularProgressbar
              value={otherProgress}
              text={`${otherProgress}%`}
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

      <div className="chart-row">
        <div className="chart-container">
          <h2>Actividad de Reportes</h2>
          <Line data={lineData} options={lineOptions} />
        </div>

        <div className="chart-container pie-chart-container">
          <h2>Nivel de Riesgo</h2>
          <div className="pie-chart-wrapper">
            <div style={{ width: '250px', height: '250px' }}>
              <Pie data={pieData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
            <div className="pie-chart-legend">
              <div><span style={{ color: '#ff6384' }}>⬤</span> Crítico</div>
              <div><span style={{ color: '#36a2eb' }}>⬤</span> Alto</div>
              <div><span style={{ color: '#ffce56' }}>⬤</span> Moderado</div>
              <div><span style={{ color: '#66bb6a' }}>⬤</span> Bajo</div>
            </div>
          </div>
        </div>
      </div>



      <div className="data-table">
        <h2>Detalles de Incidentes</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Severidad</th>
              <th>Estado</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
