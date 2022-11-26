import connDB
import sqlite3
from datetime import datetime

def insertResults(results):
    """
    It takes a results object, gets the current date, and inserts the results object's attributes into
    the database
    
    :param results: a class object that contains the results of a speed test
    """
    try:
        conn = connDB.initDB()
        cursor = conn.cursor()
        date = datetime.now().strftime('%Y-%m-%d %H:%M')
        cursor.execute("""
        INSERT INTO speedResults (download, upload, ping, latency, sponsor, date)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (results.getDownload(), results.getUpload(), results.getPing(), results.getLatency(), results.getSponsor(), date))
        conn.commit()
    except sqlite3.Error as e:
        print("Error: %s" % e)
    finally:
        connDB.closeConn(conn)
        