from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI

from app.api.middlewares import log_request
from app.api.router import api_router
from app.core import config, database


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = config.get_settings()
    engine, session_factory = database.create_database(settings)

    app.state.engine = engine
    app.state.session_factory = session_factory

    yield
    await engine.dispose()


app = FastAPI(title="SymComp API", version="0.1.0", lifespan=lifespan)
app.include_router(
    api_router,
    prefix="/api/v1",
    dependencies=[Depends(config.get_settings), Depends(database.get_session)],
)
