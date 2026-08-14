# SymComp Project

Welcome to the SymComp website repository!

First of all, copy .env.example to .env file

Next, to run it locally, use

```bash
docker compose up --build
```

## Docs

To find the backend documentation: `localhost:8000/docs`.

## Linter

To run the linter inside the Docker container:

```bash
docker compose exec backend ruff check .
``` 

To automatically fix issues when possible:

```
docker compose exec backend ruff check . --fix
```
