import sqlite3

PATH = 'data.db'

def initDB():
    """
    If the database doesn't exist, create it. If it does exist, do nothing.
    :return: A connection object.
    """
    try:
        conn = sqlite3.connect(PATH)
        cursor = conn.cursor()
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS "speedResults" (
            "id"	    INTEGER,
            "download"  REAL,
            "upload"    REAL,
            "ping"	    REAL,
            "latency"	REAL,
            "sponsor"	TEXT,
            "date"      TIMESTAMP,
            PRIMARY KEY("id" AUTOINCREMENT)
        );
        """)
        return conn
    except sqlite3.Error as e:
        print("Error: %s" % e)

def closeConn(conn):
    """
    It closes the connection to the database
    
    :param conn: The connection object
    """
    conn.close()
    