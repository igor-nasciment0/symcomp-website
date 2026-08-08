from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI

from app.api.router import api_router
from app.core import config, database


@asynccontextmanager
async def lifespan(_: FastAPI):
    yield
    await database.engine.dispose()


app = FastAPI(title="SymComp API", version="0.1.0", lifespan=lifespan)
app.include_router(
    api_router,
    prefix="/api/v1",
    dependencies=[Depends(config.get_settings), Depends(database.get_session)],
)
