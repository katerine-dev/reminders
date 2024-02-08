# reminders
Full stack application to manage reminders

## Venv 

Enabling virtual environment:
```sh
poetry shell
```
Installing a single depdency:
```sh
# The line below adds the `requests` library
poetry add requests
```

Installing project dependencies:
```sh
poetry install
```

Command line for postgresql service via docker:
```sh
docker run -d \
    --rm \
    --name reminders \
    -e POSTGRES_PASSWORD=reminders \
    -e POSTGRES_USER=reminders \
    -e POSTGRES_DB=reminders \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v pgdata:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres
```

Migrations List:
```sh
yoyo list 
```
For Apply Migrations:
```sh
yoyo apply
```

For run the server:
```sh
uvicorn reminders.main:app --host 0.0.0.0 --port 80
```
