import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Monitoreo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.random() * 100;
      setData((prevData) => [...prevData.slice(-20), newValue]); // Simula datos en tiempo real
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: data.map((_, i) => i),
    datasets: [{
      label: 'Tráfico en Tiempo Real',
      data: data,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    }],
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Monitoreo en Tiempo Real</h1>
      <div style={styles.chartContainer}>
        <Line data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  chartContainer: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
};

export default Monitoreo;
