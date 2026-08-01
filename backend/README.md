# Backend

TODO 

## ORM and Alembic workflow

When using SQLAlchemy ORM paired with Alembic for migrations, workflow is mostly:

1. Chande or add an SQLAlchemy. Example:

```python 
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class Product(Base):
    __tablename__ = "products"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True)
    price: Mapped[float]
```

2. Generate a migration:

```bash
$ uv run alembic revision --autogenerate -m "<message describing change"
```

3. Review the generated migration.

Check for table names, fields, defaults, foreign keys, etc. Add data changes manually if needed.

4. Apply locally:

```bash
$ uv run alembic upgrade head
```

5. Commit your changes. 

Commit together: SQLAlchemy model changes, migration files (under `alembic/versions/`) and tests for new behaviour. In new environments, `alembic upgrade head` builds the full schema from zero.
