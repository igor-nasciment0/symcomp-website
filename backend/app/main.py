from fastapi import Depends, FastAPI

from app.api.middlewares import log_request
from app.api.router import api_router
from app.core import config

app = FastAPI(title="SymComp API", version="0.1.0")

app.middleware("http")(log_request)

app.include_router(
    api_router, prefix="/api/v1", dependencies=[Depends(config.get_settings)]
)
