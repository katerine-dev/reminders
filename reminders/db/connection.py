# Return a connection provided by psycopg.
import psycopg

#TODO: mover confgiuracao do banco para variaveis de ambiente
def get_connection():
    return psycopg.connect(
        "dbname=reminders host=localhost user=reminders password=reminders port=5432", autocommit=True
    )