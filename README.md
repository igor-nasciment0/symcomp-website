# Symcomp-project

## Local development
For a local deployment of the three services, use:
```
docker compose up --build
```

If you want to develop only the api, run:
```
docker compose up --build backend postgres
```

Or if you want to run the `frontend`, specify it at the end of the command

## Testing
The `./run-tests.sh` script implements testing. To run for the first time, use:
```
./run-tests.sh --build
```
This will build and run frontend (TODO) and backend tests.
Testing is implemented aiming for development. So, docker-compose.test implements volume binding in order to avoid multiple builds. You can test after building for the first time with:
```
./run-tests.sh
```

## Production
Use the `docker-compose.prod.yml` file:
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```
You can remove the `-d` flag to not run on the background only.

Don't forget to fill the `.env` file with appropriate values!

## Migrations
Ideally, we should not use makemigrations everytime (specially in production), only when creating/editing models. But this causes the problem of backend container failling because there are missing tables from our database. To fix this, there are some workarounds:

- You can add back the `python manage.py makemigrations <app_name>` TEMPORARILY on `entrypoint.sh`
- You can run this command to make the migration files: 
```bash
docker-compose run --rm backend python manage.py makemigrations <app_name>
```


