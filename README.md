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

# Contribution

## Branches

Repo: frontend, backend
Work tag: feat, fix, refactor, mr, test, style,...

Branch name: <Repo>/<work tag>-(name-for-the-branch)

## Frontend

- Files must be named as **slugs**
- SOLID must be followed when defining components
- Any component for a project must be defined at Storyboard

## Backend

- Files and python params must be named in **snake_case**
- REST HTTP Requests' params must be named in **camelCase**
- Classes must be named in **PascalCase**

## Tests

We adopted Behavior Driven Development (BDD).

Then, you must define a Gherkin text file and a pytest script.

```gherkin
# tests/features/file_name.feature
Feature: <File's name without snake_case>
    Scenario: <User desire about the system written in first person. Ex.: I want...>
        Given <System's antecedent state>
        When <User action written in first person>
        Then <System's current state as a consequence of user's action>
```

```python
# tests/steps/test_file_name.feature

import pytest
from rest_framework.test import APIClient
from pytest_bdd import scenario, given, when, then

@pytest.fixture
def client():
    return APIClient()

@pytest.fixture
def context():
    return {}

@pytest.mark.django_db
@scenario("../features/file_name.feature", "I want...")
def test_name():
    pass

@given("the system is")
def the_system_is(client, context, ...):
    assert ...

@when("I, as an user, do something")
def i_did_something(client, context, ...):
    assert ...

@then("the system must respond as such")
def system_respond_as_such(client,context, ...):
    assert ...
```
