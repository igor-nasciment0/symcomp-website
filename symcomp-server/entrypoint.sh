#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Waiting for database to be ready..."
python wait-for-db.py

# Apply database migrations (NOT RECOMMENDED TO PUT THE MAKEMIGRATIONS HERE)
# But haven't found any other workaround. Possibly what you can do is makemigraitons when first running to ensure migrations file, and then
# Remove the makemigrations line
echo "Creating and applying database migrations..."
python manage.py makemigrations --empty api
python manage.py makemigrations --empty desafio
python manage.py makemigrations --empty username
python manage.py makemigrations --empty atividade
python manage.py migrate

python manage.py import_drag_family

if [ "$DJANGO_ENV" = "production" ]; then
  echo "Collecting static files..."
  python manage.py collectstatic --noinput
fi

python seed.py

# Then exec the container's main process (what's set as CMD in the Dockerfile,
# or passed to the 'command' instruction in docker-compose.yml).
exec "$@"
