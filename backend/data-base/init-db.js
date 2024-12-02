const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conectar a la base de datos SQLite
const dbPath = path.resolve(__dirname, 'mi-base-datos.sqlite');
const db = new sqlite3.Database(dbPath);

// Inicializar la base de datos con múltiples consultas en un solo exec()
const sql = `
  CREATE TABLE IF NOT EXISTS Tipo_amenaza (
    ID_tipo_amenaza INTEGER PRIMARY KEY,
    Tipo_amenaza TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS Tipo_dispositivo (
    ID_tipo_dispositivo INTEGER PRIMARY KEY,
    Tipo_dispositivo TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS Amenaza (
    ID_Amenaza INTEGER PRIMARY KEY,
    ID_tipo_amenaza INTEGER NOT NULL,
    Fecha_deteccion TEXT NOT NULL,
    Nivel_severidad TEXT NOT NULL,
    Descripcion TEXT,
    Estado TEXT NOT NULL,
    FOREIGN KEY (ID_tipo_amenaza) REFERENCES Tipo_amenaza(ID_tipo_amenaza)
  );

  CREATE TABLE IF NOT EXISTS Dispositivo (
    ID_dispositivo INTEGER PRIMARY KEY,
    ID_tipo_dispositivo INTEGER NOT NULL,
    IP TEXT NOT NULL,
    Estado TEXT NOT NULL,
    Ubicacion TEXT NOT NULL,
    FOREIGN KEY (ID_tipo_dispositivo) REFERENCES Tipo_dispositivo(ID_tipo_dispositivo)
  );

  CREATE TABLE IF NOT EXISTS Usuario (
    ID_usuario INTEGER PRIMARY KEY,
    Nombre TEXT NOT NULL,
    Rol TEXT NOT NULL,
    Email TEXT NOT NULL,
    Fecha_creacion TEXT NOT NULL
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

  CREATE TABLE IF NOT EXISTS Politica_seguridad (
    ID_politica INTEGER PRIMARY KEY,
    Nombre TEXT NOT NULL,
    Descripcion TEXT NOT NULL,
    Tipo TEXT NOT NULL,
    Fecha_implementacion TEXT NOT NULL,
    Activa INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS Reporte (
    ID_Reporte INTEGER PRIMARY KEY,
    Fecha_Generacion TEXT NOT NULL,
    Tipo_Reporte TEXT NOT NULL,
    Detalles TEXT NOT NULL,
    Generado_Por TEXT NOT NULL,
    ID_Usuario INTEGER NOT NULL,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
  );

  CREATE TABLE IF NOT EXISTS Integracion (
    ID_Integracion INTEGER PRIMARY KEY,
    Herramienta TEXT NOT NULL,
    Descripcion TEXT NOT NULL,
    Fecha_Integracion TEXT NOT NULL, 
    Activa INTEGER DEFAULT 1
  );
`;

db.exec(sql, (err) => {
  if (err) {
    console.error('Error al crear las tablas:', err);
  } else {
    console.log('Tablas creadas exitosamente.');
  }
});

// Cerrar la conexión
db.close();
