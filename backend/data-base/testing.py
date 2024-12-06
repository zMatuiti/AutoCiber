import subprocess
import sqlite3
import glob
import os

conn = sqlite3.connect('db.sqlite')
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER UNIQUE,
    sensor_id INTEGER,
    event_second INTEGER,
    packet_second INTEGER,
    packet_length INTEGER
)
''')

log_dir = '/var/log/snort'
log_files = glob.glob(os.path.join(log_dir, 'barn.log*'))

if not log_files:
    print(f"No se encontraron archivos barn.log en {log_dir}")
else:
    for log_file in log_files:
        print(f"Procesando archivo: {log_file}")
        
        try:
            result = subprocess.run(['sudo', 'u2spewfoo', log_file], capture_output=True, text=True, check=True)
            
            output = result.stdout
            
            for line in output.splitlines():
                if "event id" in line and "sensor id" in line:
                    try:
                        event_id = int(line.split("event id:")[1].split()[0])
                        sensor_id = int(line.split("sensor id:")[1].split()[0])
                        event_second = int(line.split("event second:")[1].split()[0])

                        packet_second = None
                        packet_length = None
                        for subline in output.splitlines():
                            if "packet second:" in subline:
                                packet_second = int(subline.split("packet second:")[1].split()[0])
                            if "packet_length:" in subline:
                                packet_length = int(subline.split("packet_length:")[1].split()[0])
                        
                        cursor.execute("SELECT COUNT(*) FROM events WHERE event_id = ?", (event_id,))
                        if cursor.fetchone()[0] == 0:
                            cursor.execute('''
                            INSERT INTO events (event_id, sensor_id, event_second, packet_second, packet_length)
                            VALUES (?, ?, ?, ?, ?)
                            ''', (event_id, sensor_id, event_second, packet_second, packet_length))

                    except (IndexError, ValueError) as e:
                        print(f"Error al procesar una línea: {line} - {str(e)}")

            conn.commit()

        except subprocess.CalledProcessError as e:
            print(f"Error al ejecutar u2spewfoo en el archivo {log_file}: {e}")

conn.close()
