#!/bin/sh
set -e

echo "Applying migrations to test database..."
alembic upgrade head

echo "Testing..."
pytest "$@"
EXIT_CODE=$?

echo "Finishing tests and terminating container"
exit $EXIT_CODE