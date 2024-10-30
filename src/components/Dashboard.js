import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const lineData = {
    labels: Array.from({ length: 10 }, (_, i) => i),
    datasets: [
      {
        label: 'Vulnerabilidades',
        data: [500, 400, 600, 800, 700, 500, 600, 700, 800, 600],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: 'Posibles Ataques',
        data: [200, 300, 400, 500, 600, 400, 300, 200, 400, 500],
        borderColor: 'blue',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
    ],
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Reportes</h1>
      </div>
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <h2>Reportes</h2>
          <p style={styles.cardValue}>80</p>
        </div>
        <div style={styles.card}>
          <h2>Posibles Ataques</h2>
          <p style={styles.cardValue}>16</p>
        </div>
        <div style={styles.card}>
          <h2>Vulnerabilidades</h2>
          <div style={styles.circularContainer}>
            <CircularProgressbar
              value={75}
              text={`${75}%`}
              styles={buildStyles({
                textSize: '24px',
                pathColor: 'green',
                textColor: 'black',
                trailColor: '#d6d6d6',
              })}
            />
          </div>
        </div>
        <div style={styles.card}>
          <h2>Otro</h2>
          <div style={styles.circularContainer}>
            <CircularProgressbar
              value={15}
              text={`${15}%`}
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

      {/* Gráfico de líneas */}
      <div style={styles.chartContainer}>
        <h2>Gráfico</h2>
        <div style={styles.chartWrapper}>
          <Line data={lineData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  cardsContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  card: {
    flex: 1,
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  cardValue: {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  circularContainer: {
    width: '80px',
    height: '80px',
    margin: '0 auto',
  },
  chartContainer: {
    marginTop: '20px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  chartWrapper: {
    width: '90%',
    maxWidth: '800px',
    margin: '0 auto',
  },
};

export default Dashboard;
