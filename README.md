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
    --name reminders_db \
    --network reminders-network \
    -e POSTGRES_PASSWORD=reminders \
    -e POSTGRES_USER=reminders \
    -e POSTGRES_DB=reminders \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v pgdata:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres
```

```sh
docker build -t "reminders" .
```

```sh
docker run -p 8000:8000 --env-file .env --network reminders-network reminders
```

### Migrations

before executing any migration command, make sure you run:

```sh
source .env
```

Migration list:

```sh
yoyo list
```

For Apply Migrations:

```sh
yoyo apply
```

### Fast API

For run the server:

Step 1:

```sh
source .env
```

Step 2:

```sh
uvicorn reminders.main:app --host 0.0.0.0 --port 8000
```

For run execute script with npm (spa):

```sh
npm run dev
```
