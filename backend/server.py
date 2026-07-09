"""FastAPI backend — works both locally (via supervisor / uvicorn) and on
Vercel Services.

MongoDB is OPTIONAL:
  * If `MONGO_URL` is set → Mongo endpoints work.
  * If not set → Mongo endpoints return HTTP 503 but the API is still up
    (so /api and /api/health always respond).

Vercel Services entrypoint (see vercel.json): `server:app`
"""
import os
import uuid
import logging
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional

from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ConfigDict
from dotenv import load_dotenv

# Load .env for local dev (harmless on Vercel where env comes from dashboard)
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# ---------------------------------------------------------------------------
# Lazy MongoDB (only initialised on first Mongo-dependent request)
# ---------------------------------------------------------------------------
_mongo_client = None
_db = None


def get_db() -> Optional[object]:
    """Return an AsyncIOMotor DB handle, or None if Mongo isn't configured."""
    global _mongo_client, _db
    if _db is not None:
        return _db
    mongo_url = os.environ.get("MONGO_URL")
    if not mongo_url:
        return None
    try:
        from motor.motor_asyncio import AsyncIOMotorClient
        _mongo_client = AsyncIOMotorClient(mongo_url)
        _db = _mongo_client[os.environ.get("DB_NAME", "sevenx")]
        return _db
    except Exception as e:  # pragma: no cover
        logger.exception("Mongo init failed: %s", e)
        return None


# ---------------------------------------------------------------------------
# FastAPI app  (must be named `app` for Vercel's zero-config detection)
# ---------------------------------------------------------------------------
app = FastAPI(
    title="SevenX API",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")


# ---------- Models ---------------------------------------------------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# ---------- Routes ---------------------------------------------------------
@api_router.get("/")
async def root():
    return {
        "message": "Hello from SevenX API",
        "mongo_enabled": get_db() is not None,
    }


@api_router.get("/health")
async def health():
    return {
        "status": "ok",
        "mongo_enabled": get_db() is not None,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(payload: StatusCheckCreate):
    db = get_db()
    if db is None:
        raise HTTPException(
            status_code=503,
            detail="MongoDB is not configured. Set MONGO_URL in Vercel env vars.",
        )
    status_obj = StatusCheck(client_name=payload.client_name)
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    db = get_db()
    if db is None:
        raise HTTPException(
            status_code=503,
            detail="MongoDB is not configured. Set MONGO_URL in Vercel env vars.",
        )
    checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for c in checks:
        if isinstance(c.get("timestamp"), str):
            c["timestamp"] = datetime.fromisoformat(c["timestamp"])
    return checks


app.include_router(api_router)


@app.on_event("shutdown")
async def shutdown_db_client():
    global _mongo_client
    if _mongo_client is not None:
        _mongo_client.close()
