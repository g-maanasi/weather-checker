import sqlite3

try:
    conn = sqlite3.connect('weather.db')
    cursor = conn.cursor()
    print('DB Init')

    # Create users table
    query = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, email TEXT, role TEXT, password_hash VARCHAR(200), salt VARCHAR(100));"
    cursor.execute(query)

    cursor.close()
except Exception as e:
    print(str(e))