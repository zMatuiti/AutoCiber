import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      navigate('/dashboard');
    } else {
      alert('Por favor, ingrese usuario y contraseña');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Automatic Intrusion Detection System</h2>
        <div style={styles.formContainer}>
          <div style={styles.form}>
            <label style={styles.label}>Usuario</label>
            <input 
              type="text" 
              style={styles.input} 
              placeholder="Ingrese su usuario" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label style={styles.label}>Contraseña</label>
            <input 
              type="password" 
              style={styles.input} 
              placeholder="Ingrese su contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button style={styles.button} onClick={handleLogin}>Entrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#e0e0e0',
  },
  loginBox: {
    width: '500px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    width: '100px',
    height: '100px',
    margin: '10px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
  },
  input: {
    width: '200px',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#e0f7fa',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#b0bec5',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Login;
