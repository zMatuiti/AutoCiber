import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para manejar mensajes de error
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');

    if (!username || !password) {
      setError('Por favor, ingrese usuario y contraseña');
      return;
    }

    try {
      // Enviar credenciales al backend
      const response = await axios.post('http://localhost:5000/api/login', {
        email: username,
        password,
      });

      if (response.data.success) {
        // Almacenar información del usuario (opcional)
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirigir al dashboard si el login es exitoso
        navigate('/dashboard');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      console.error('Error durante el login:', err);

      if (err.response) {
        if (err.response.status === 401) {
          setError('Usuario o contraseña incorrectos');
        } else if (err.response.status === 400) {
          setError('Por favor, completa todos los campos.');
        } else {
          setError('Error del servidor. Intente nuevamente más tarde.');
        }
      } else {
        setError('No se pudo conectar al servidor. Verifica tu conexión.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Sistema de Seguridad</h2>
        <div style={styles.formContainer}>
          <div style={styles.form}>
            {error && <p style={styles.error}>{error}</p>}
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
            <button style={styles.button} onClick={handleLogin}>
              Entrar
            </button>
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
  error: {
    color: 'red',
    marginBottom: '10px',
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
