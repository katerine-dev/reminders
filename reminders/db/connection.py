# Return a connection provided by psycopg.
import psycopg
import os
from dotenv import load_dotenv

load_dotenv()

def get_connection():
    return psycopg.connect(
        dbname=os.getenv("DB_NAME"),
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        port=os.getenv("DB_PORT"),
        autocommit=True
    )