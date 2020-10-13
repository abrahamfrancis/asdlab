# Player Auction

A simple player auction system for prototypihng an auction management application.

## How this works
SQL Tables are created and altered (if necessary) using python with [SQLAlchemy](https://github.com/sqlalchemy/sqlalchemy) and [Alembic](https://github.com/sqlalchemy/alembic) on a PostgreSql instance

The REST api is generated in compiled Haskell (with Warp HTTP server) automatically using [PostgREST](https://github.com/PostgREST/postgrest)

## How to run
Setup venv and install requirements
```sh
python -m venv venv
. venv/bin/activate
pip install -r requirements.txt
```

Upgrade Database (change connection uri in models/config.py if necessary)
```sh
alembic upgrade head
```

The db should now be created/upgraded to the latest version.
Run commands inside `setup_roles.sql` to configure roles.

Run using postgrest executable
```sh
/path/to/postgrest ./postgrest.conf
```

For API documentation, open `redoc.html` and `swagger.html` (inside docs/) while server is running.
