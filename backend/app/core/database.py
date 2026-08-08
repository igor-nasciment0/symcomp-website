from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase

from app.core.config import Settings, get_settings


class Base(DeclarativeBase):
    pass


def create_engine(settings: Settings) -> AsyncEngine:
    return create_async_engine(settings.database_url.unicode_string())


def create_session_factory(engine: AsyncEngine) -> async_sessionmaker[AsyncSession]:
    return async_sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)


settings = get_settings()
engine = create_engine(settings)
async_session_factory = create_session_factory(engine)


async def get_session() -> AsyncGenerator[AsyncSession, None]:

    async with async_session_factory() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
