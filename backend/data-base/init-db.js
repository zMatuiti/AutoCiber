const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta de la base de datos
const dbPath = path.resolve(__dirname, 'mi-base-datos.sqlite');
const db = new sqlite3.Database(dbPath);

// Función para inicializar la base de datos
const initializeDatabase = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS Nivel_severidad (
      Nivel TEXT PRIMARY KEY
    );

    INSERT OR IGNORE INTO Nivel_severidad (Nivel) VALUES 
      ('bajo'), 
      ('nmedio'), 
      ('lalto');

    CREATE TABLE IF NOT EXISTS Estado_Amenaza (
      Estado TEXT PRIMARY KEY
    );

    INSERT OR IGNORE INTO Estado_Amenaza (Estado) VALUES 
      ('en proceso'), 
      ('mitigado'), 
      ('resuelto'), 
      ('pendiente');

    CREATE TABLE IF NOT EXISTS Estado_Dispositivo (
      Estado TEXT PRIMARY KEY
    );

    INSERT OR IGNORE INTO Estado_Dispositivo (Estado) VALUES 
      ('activo'), 
      ('aislado'), 
      ('bloqueado');

    CREATE TABLE IF NOT EXISTS Rol_Usuario (
      Rol TEXT PRIMARY KEY
    );

    INSERT OR IGNORE INTO Rol_Usuario (Rol) VALUES 
      ('administrador'), 
      ('analista'), 
      ('usuario');

    CREATE TABLE IF NOT EXISTS Tipo_Politica_Seguridad (
      Tipo TEXT PRIMARY KEY
    );

    INSERT OR IGNORE INTO Tipo_Politica_Seguridad (Tipo) VALUES 
      ('control de acceso'), 
      ('autenticación'), 
      ('IDS/IPS');

    CREATE TABLE IF NOT EXISTS Tipo_Reporte (
      Tipo TEXT PRIMARY KEY
    );

    INSERT OR IGNORE INTO Tipo_Reporte (Tipo) VALUES 
      ('diario'), 
      ('mensual'), 
      ('semanal'), 
      ('anual');

    CREATE TABLE IF NOT EXISTS Herramienta_Integracion (
      Herramienta TEXT PRIMARY KEY
    );

    INSERT OR IGNORE INTO Herramienta_Integracion (Herramienta) VALUES 
      ('Snort'), 
      ('Zeek');

    CREATE TABLE IF NOT EXISTS Tipo_amenaza (
      ID_tipo_amenaza INTEGER PRIMARY KEY,
      Tipo_amenaza TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Tipo_dispositivo (
      ID_tipo_dispositivo INTEGER PRIMARY KEY,
      Tipo_dispositivo TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Incidente (
      ID_Incidente INTEGER PRIMARY KEY,
      Fecha_Inicio TEXT NOT NULL, 
      Fecha_Fin TEXT,
      Descripcion TEXT,
      Estado TEXT NOT NULL,
      Accion_Tomada TEXT,
      ID_Amenaza INTEGER NOT NULL,
      ID_Dispositivo INTEGER NOT NULL,
      ID_Usuario INTEGER NOT NULL,
      FOREIGN KEY (ID_Amenaza) REFERENCES Amenaza(ID_Amenaza),
      FOREIGN KEY (ID_Dispositivo) REFERENCES Dispositivo(ID_Dispositivo),
      FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
    );

    CREATE TABLE IF NOT EXISTS Amenaza (
      ID_Amenaza INTEGER PRIMARY KEY,
      ID_tipo_amenaza INTEGER NOT NULL,
      Fecha_deteccion TEXT NOT NULL,
      Nivel_severidad TEXT NOT NULL,
      Descripcion TEXT,
      Estado TEXT NOT NULL,
      FOREIGN KEY (ID_tipo_amenaza) REFERENCES Tipo_amenaza(ID_tipo_amenaza),
      FOREIGN KEY (Nivel_severidad) REFERENCES Nivel_severidad(Nivel),
      FOREIGN KEY (Estado) REFERENCES Estado_Amenaza(Estado)
    );

    CREATE TABLE IF NOT EXISTS Dispositivo (
      ID_dispositivo INTEGER PRIMARY KEY,
      ID_tipo_dispositivo INTEGER NOT NULL,
      IP TEXT NOT NULL,
      Estado TEXT NOT NULL,
      Ubicacion TEXT NOT NULL,
      FOREIGN KEY (ID_tipo_dispositivo) REFERENCES Tipo_dispositivo(ID_tipo_dispositivo),
      FOREIGN KEY (Estado) REFERENCES Estado_Dispositivo(Estado)
    );

    CREATE TABLE IF NOT EXISTS Usuario (
      ID_usuario INTEGER PRIMARY KEY,
      Nombre TEXT NOT NULL,
      Rol TEXT NOT NULL,
      Email TEXT NOT NULL,
      Pw TEXT NOT NULL,
      Fecha_creacion TEXT NOT NULL,
      FOREIGN KEY (Rol) REFERENCES Rol_Usuario(Rol)
    );

    CREATE TABLE IF NOT EXISTS Politica_seguridad (
      ID_politica INTEGER PRIMARY KEY,
      Nombre TEXT NOT NULL,
      Descripcion TEXT NOT NULL,
      Tipo TEXT NOT NULL,
      Fecha_implementacion TEXT NOT NULL,
      Activa INTEGER DEFAULT 1,
      FOREIGN KEY (Tipo) REFERENCES Tipo_Politica_Seguridad(Tipo)
    );

    CREATE TABLE IF NOT EXISTS Reporte (
      ID_Reporte INTEGER PRIMARY KEY,
      Fecha_Generacion TEXT NOT NULL,
      Tipo_Reporte TEXT NOT NULL,
      Detalles TEXT NOT NULL,
      Generado_Por TEXT NOT NULL,
      ID_Usuario INTEGER NOT NULL,
      FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario),
      FOREIGN KEY (Tipo_Reporte) REFERENCES Tipo_Reporte(Tipo)
    );

    CREATE TABLE IF NOT EXISTS Integracion (
      ID_Integracion INTEGER PRIMARY KEY,
      Herramienta TEXT NOT NULL,
      Descripcion TEXT NOT NULL,
      Fecha_Integracion TEXT NOT NULL, 
      Activa INTEGER DEFAULT 1,
      FOREIGN KEY (Herramienta) REFERENCES Herramienta_Integracion(Herramienta)
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL,
      signature TEXT NOT NULL,
      source_ip TEXT NOT NULL,
      source_port INTEGER,
      destination_ip TEXT NOT NULL,
      destination_port INTEGER,
      protocol TEXT
    );
  `;

  db.exec(sql, (err) => {
    if (err) {
      console.error('Error al inicializar la base de datos:', err.message);
    } else {
      console.log('Base de datos inicializada correctamente.');
    }
  });
};

module.exports = { db, initializeDatabase };

